import {cart, calculateCartQuantity} from "../../data/cart.js"
import {findProduct} from "../../data/products.js"
import {findDeliveryOption} from "../../data/deliveryOptions.js"
import {formatMoneyAmount} from "../utils/money.js"
import { addOrder } from "../../data/orders.js"
import { deleteWholeCart } from "../../data/cart.js"


// Generate the HTML of the page
function renderPaymentSummary() {
  let totalProductsPriceCents = 0;
  let totalShippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = findProduct(cartItem.productId);
    totalProductsPriceCents += product.priceCents * cartItem.quantity

    const deliveryOption = findDeliveryOption(cartItem.deliveryOptionId);
    totalShippingPriceCents += deliveryOption.priceCents
  });

  const totalBeforeTax = totalProductsPriceCents + totalShippingPriceCents
  const taxCents = totalBeforeTax * 0.10
  const totalCents = totalBeforeTax + taxCents

  const paymentSummaryElement = document.querySelector(".js-payment-summary");
  const paymentHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatMoneyAmount(totalProductsPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatMoneyAmount(totalShippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatMoneyAmount(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatMoneyAmount(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatMoneyAmount(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  `;

  paymentSummaryElement.innerHTML = paymentHTML

  // Create event listener for place order button
  const placeOrderButtonElement = document.querySelector(".js-place-order-button");

  placeOrderButtonElement.addEventListener("click", async () => {
    try {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          cart: cart
        })
      })
  
      const order = await response.json();
      console.log(order)
      addOrder(order);
    } catch (error) {
      console.log(`Failed to place order due to: ${error}`)
    }

    window.location.href = "orders.html" // location is a special object to control the url

    deleteWholeCart();
  })
}

export {renderPaymentSummary}