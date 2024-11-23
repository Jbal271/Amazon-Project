import {findOrder} from "../data/orders.js";
import {formatDate} from "./utils/date.js"
import {findProduct} from "../data/products.js"
import { loadProductsFetch } from "../data/products.js";
import { updateCartQuantity } from "./utils/updateCartElement.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

loadProductsFetch().then(() => {
  renderTracking();
});

function renderTracking() {
  const url = new URL(window.location.href)
  const orderId = url.searchParams.get("orderId")
  const productId = url.searchParams.get("productId")
  const order = findOrder(orderId);
  const productOrderDetails = findProductInOrder(order.products, productId)
  const deliveryDate = productOrderDetails.estimatedDeliveryTime
  const product = findProduct(productId);

  // Time 
  const currentTime = dayjs().unix();
  const orderTime = dayjs(order.orderTime).unix()
  const deliveryTime = dayjs(deliveryDate).unix()
  const progressPercentage = ((((currentTime - orderTime) / (deliveryTime - orderTime)) * 100)).toFixed(1)

  const orderTrackingElement = document.querySelector(".js-order-tracking")
  orderTrackingElement.innerHTML = `
    <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
  
    <div class="delivery-date">
      Arriving on ${formatDate(deliveryDate, 'dddd, DD MMMM')}
    </div>
  
    <div class="product-info">
      ${product.name}
    </div>
  
    <div class="product-info">
      Quantity: ${productOrderDetails.quantity}
    </div>
  
    <img class="product-image" src="${product.image}">
  
    <div class="progress-labels-container">
      <div class="progress-label js-preparing-label">
        Preparing
      </div>
      <div class="progress-label js-shipped-label">
        Shipped
      </div>
      <div class="progress-label js-delivered-label">
        Delivered
      </div>
    </div>
  
    <div class="progress-bar-container">
      <div class="progress-bar" style="width:${progressPercentage}%"></div>
    </div>
    </div>
  `

  updateCartQuantity();

  // Labels
  const preparingLabelElement = document.querySelector(".js-preparing-label")
  const shippedLabelElement = document.querySelector(".js-shipped-label")
  const deliveredLabelElement = document.querySelector(".js-delivered-label")
  preparingLabelElement.classList.remove("current-status")
  shippedLabelElement.classList.remove("current-status")
  deliveredLabelElement.classList.remove("current-status")

  if (progressPercentage < 50) {
    preparingLabelElement.classList.add("current-status")
  } else if (progressPercentage >= 50 && progressPercentage < 100) {
    shippedLabelElement.classList.add("current-status")
  } else if (progressPercentage >= 100) {
    deliveredLabelElement.classList.add("current-status")
  }

   // Create event listeners for the search button
   const searchButtonElement = document.querySelector(".js-search-button");
   const searchInput = document.querySelector(".js-search-input");
 
   searchButtonElement.addEventListener("click", () => {
     window.location.href = `amazon.html?search=${searchInput.value}`
   })
  
  // Functions
  function findProductInOrder(productsArray, id) {
    let matchingProduct;
    productsArray.forEach((product) => {
      if (product.productId === id) {
        matchingProduct = product
      }
    })
  
    return matchingProduct;
  }
}



