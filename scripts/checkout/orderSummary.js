import {cart, deleteFromCart, updateCartQuantity, updateDeliveryOption} from "../../data/cart.js";
import {findProduct} from "../../data/products.js";
import {calculateDeliveryDate, deliveryOptions, findDeliveryOption} from "../../data/deliveryOptions.js"
import {formatMoneyAmount} from "../utils/money.js" // "." means current folder
import {renderPaymentSummary} from "./paymentSummary.js";
import {renderCheckoutHeader} from "./checkoutHeader.js";


// Generate the HTML of the page
function renderOrderSummary() {
  const orderSummaryElement = document.querySelector(".js-order-summary");
  let orderHTML = ``;
  
  cart.forEach((cartItem, index) => {
    const productId = cartItem.productId
    const matchingProduct = findProduct(productId);
  
    const deliveryOptionId = cartItem.deliveryOptionId
    const matchingDeliveryOption = findDeliveryOption(deliveryOptionId);
  
    const deliveryDate = calculateDeliveryDate(matchingDeliveryOption);
    
    orderHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
  
          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(index, cartItem)}
          </div>
        </div>
      </div>
    `
  });
  
  orderSummaryElement.innerHTML = orderHTML;
  renderCheckoutHeader();
  
  // Create event listeners for the delete buttons
  const deleteLinkElements = document.querySelectorAll(".js-delete-link");
  
  deleteLinkElements.forEach((element) => {
    element.addEventListener("click", () => {
      const {productId} = element.dataset;
      deleteItem(productId);
      renderPaymentSummary();
    })
  })
  
  // Create event listeners for the update buttons
  const updateLinkElements = document.querySelectorAll(".js-update-link");
  
  updateLinkElements.forEach((element) => {
    element.addEventListener("click", () => {
      const {productId} = element.dataset;
      const itemContainerElement = document.querySelector(`.js-cart-item-container-${productId}`);
      
      itemContainerElement.classList.add("is-editing-quantity");
    })
  })
  
  // Create event listeners for the save buttons
  const saveLinkElements = document.querySelectorAll(".js-save-quantity-link");
  
  saveLinkElements.forEach((element) => {
    element.addEventListener("click", () => {
      const {productId} = element.dataset;
      saveItem(productId);
      renderPaymentSummary();
    })
  })
  
  // Create event listener for the body (use enter)
  const body = document.body;
  
  body.addEventListener("keydown", (event) => {
    const itemContainerElements = document.querySelectorAll(`.is-editing-quantity`);
  
    if (event.key === "Enter") {
      itemContainerElements.forEach((container) => {
        const {productId} = container.dataset;
        saveItem(productId);
        renderPaymentSummary();
      })
    }
  })
  
  // Create event listener for the delivery options selectors
  const deliveryOptionSelectors = document.querySelectorAll(".js-delivery-option"); 
  
  deliveryOptionSelectors.forEach((option) => {
    option.addEventListener("click", () => {
      const {productId, deliveryOptionId} = option.dataset
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
  
  // Functions
  function deleteItem(id) {
    // Deletes from the cart array
    deleteFromCart(id);
    // Regenerates the DOM
    renderOrderSummary();
    renderCheckoutHeader();
  }
  
  function saveItem(id) {
    const itemContainerElement = document.querySelector(`.js-cart-item-container-${id}`);
    const quantityInputElement = document.querySelector(`.js-quantity-input-${id}`);
    const itemQuantityLabelElement = document.querySelector(`.js-quantity-label-${id}`);
  
    const quantity = parseInt(quantityInputElement.value);
  
    // Ignore if a quantity NaN, below 0 or higher than 999 is inserted
    if (isNaN(quantity) || quantity < 0 || quantity >= 1000) {
      quantityInputElement.value = "";
      itemContainerElement.classList.remove("is-editing-quantity");
      return
    }
  
    // Logic
    updateCartQuantity(id, quantity);
    renderCheckoutHeader();
    itemQuantityLabelElement.innerText = quantity;
    quantityInputElement.value = "";
    itemContainerElement.classList.remove("is-editing-quantity");
  
    // Completely removes from the DOM if the quantity is set to 0
    if ((quantity) === 0) {
      deleteItem(id);
    }
  }
  
  function deliveryOptionsHTML(index, cartItem) {
    let html = ""
    
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = calculateDeliveryDate(deliveryOption)
      const price = deliveryOption.priceCents === 0 ? "FREE" : `$${formatMoneyAmount(deliveryOption.priceCents)} - `
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
  
      html += `
        <div class="delivery-option js-delivery-option js-delivery-option-${cartItem.productId}-${deliveryOption.id}" data-product-id="${cartItem.productId}" data-delivery-option-id="${deliveryOption.id}">  
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input js-delivery-option-input-${cartItem.productId}-${deliveryOption.id}"
            name="delivery-option-${index + 1}" >
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${price} Shipping
            </div>
          </div>
        </div>
      `
    })
  
    return html
  }
}

export {renderOrderSummary};



