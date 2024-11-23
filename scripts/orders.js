import {orders} from "../data/orders.js";
import {findProduct} from "../data/products.js";
import {formatMoneyAmount} from "./utils/money.js";
import { loadProductsFetch } from "../data/products.js";
import {addToCart} from "../data/cart.js"
import { formatDate } from "./utils/date.js";
import { updateCartQuantity } from "./utils/updateCartElement.js";

loadProductsFetch().then(() => {
  renderOrders();
});

function renderOrders() {
  const ordersGridElement = document.querySelector(".js-orders-grid")
  let html = ""

  orders.forEach((order) => {
    const date = order.orderTime

    html += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatDate(date, 'DD-MM-YYYY HH:mm:ss')}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatMoneyAmount(order.totalCostCents)}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
  
        <div class="order-details-grid">
          ${displayProductDetails(order.products, order.id)}
        </div>
      </div>
    `
  })
  
  ordersGridElement.innerHTML = html
  updateCartQuantity();

  // Create event listener for Buy Again Button
  const buyAgainButtonsArray = document.querySelectorAll(".js-buy-again-button")
  buyAgainButtonsArray.forEach((button) => {
    const {productId} = button.dataset 
    button.addEventListener("click", () => {
      addToCart(productId, 1)
    })
  })

  // Create event listeners for the search button
  const searchButtonElement = document.querySelector(".js-search-button");
  const searchInput = document.querySelector(".js-search-input");

  searchButtonElement.addEventListener("click", () => {
    window.location.href = `amazon.html?search=${searchInput.value}`
  })
}

// Functions
function displayProductDetails(productsArray, orderId) {
  let html = ""
  productsArray.forEach((product) => {
    const productId = product.productId;
    const matchingProduct = findProduct(productId);
    const date = product.estimatedDeliveryTime

    html += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${formatDate(date, 'DD-MM-YYYY')}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${orderId}&productId=${productId}">
          <button class="track-package-button button-secondary js-track-package-button">
            Track package
          </button>
        </a>
      </div>
    `
  })

  return html
}

