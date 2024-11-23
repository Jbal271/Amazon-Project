import {addToCart} from "../data/cart.js"; // ".." is to access the folder outside the current folder; "as" renames the variable 
// import * as cartModule from "../data/cart.js"; // "*" imports everyhing from that file, and groups it in an object, in this case "cartModule" (could be imported like this, in a group)
import {products, loadProductsFetch} from "../data/products.js";
import { updateCartQuantity } from "./utils/updateCartElement.js";

// Generate the HTML of the page
loadProductsFetch().then(() => {
  renderProductsGrid();
});

// Main function
function renderProductsGrid() {
  const url = new URL(window.location.href)
  let productsFiltered;
  if (url.searchParams.get("search")) {
    productsFiltered = products.filter((product) => {
      const lowerCaseName = product.name.toLowerCase();
      const lowerCaseSearch = url.searchParams.get("search").toLowerCase();
      const matchingKeywords = product.keywords.filter((keyword) => {
        if (keyword.toLowerCase().includes(lowerCaseSearch)) {
          return true;
        } else {
          return false;
        }
      })
      
      if (lowerCaseName.includes(lowerCaseSearch) || matchingKeywords != false) {
        return true;
      } else {
        return false;
      }
    })
  }

  const productsGridElement = document.querySelector(".js-products-grid");
  let productsHTML = ``;

  (productsFiltered || products).forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-product-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-message-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-button"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  productsGridElement.innerHTML = productsHTML;
  updateCartQuantity();

  // Create event listeners for the add to cart buttons
  const addToCartButtonElement = document.querySelectorAll(".js-add-to-cart-button");
  let addedMessageIsVisible = false;
  let addedTimeoutId;

  addToCartButtonElement.forEach((button) => {
    button.addEventListener("click", () => {
      // Check if it is adding to the cart
      if (addedMessageIsVisible === true) {return}

      // Add the selected amount of items to the cart
      const {productId} = button.dataset;
      const productQuantityElement = document.querySelector(`.js-product-quantity-${productId}`)
      const quantity = parseInt(productQuantityElement.value); // VALUES THAT WE GET FROM DOM ARE STRINGS BY DEFAULT!!!!
      const addedToCartMessageElement = document.querySelector(`.js-added-to-cart-message-${productId}`);
      
      addToCart(productId, quantity);
      
      displayAddedMessage(addedToCartMessageElement);

      updateCartQuantity();
    })
  })

  // Create event listeners for the search button
  const searchButtonElement = document.querySelector(".js-search-button");
  const searchInput = document.querySelector(".js-search-input");

  searchButtonElement.addEventListener("click", () => {
    window.location.href = `index.html?search=${searchInput.value}`
  })

  // Functions
  function displayAddedMessage(element) {
    if (addedMessageIsVisible === false) {
      element.classList.add("added-to-cart-visible");
      addedMessageIsVisible = true
  
      addedTimeoutId = setTimeout(() => {
        element.classList.remove("added-to-cart-visible");
        addedMessageIsVisible = false
      }, 1000);
    } else {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        addedToCartMessageElement.classList.remove("added-to-cart-visible");
        addedMessageIsVisible = false
      }, 1000);
    }
  }
}


