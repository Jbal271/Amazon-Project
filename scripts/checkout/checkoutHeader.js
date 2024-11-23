import {calculateCartQuantity} from "../../data/cart.js";

function renderCheckoutHeader() {
  const cartQuantity = calculateCartQuantity()
  const checkoutElement = document.querySelector(".js-checkout-element");
  let checkoutHTMl = `
    Checkout (<a class="return-to-home-link js-checkout-quantity" href="amazon.html">${cartQuantity} items</a>)
  `;

  checkoutElement.innerHTML = checkoutHTMl
}

export {renderCheckoutHeader}