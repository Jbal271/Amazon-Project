import { calculateCartQuantity } from "../../data/cart.js";

function updateCartQuantity() { // Amazon.html page (cart icon number)
  const cartQuantityElement = document.querySelector(".js-cart-quantity");

  const totalQuantity = calculateCartQuantity();

  cartQuantityElement.innerText = totalQuantity;
}

export {updateCartQuantity}