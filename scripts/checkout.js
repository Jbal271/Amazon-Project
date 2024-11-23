import {renderOrderSummary} from "./checkout/orderSummary.js"
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
import {loadProductsFetch} from "../data/products.js";
import {loadCartFetch} from "../data/cart.js";
// import "../data/cart-class.js" // runs everything inside of this file, instead of importing each things separately
// import "../data/car.js"
// import "../data/backend-practice.js"

async function loadPage() { // makes a function return a promise
  try {
    // throw "error1"; --> manually creates an error
    await Promise.all([loadProductsFetch(), loadCartFetch()])
  } catch (error) {
    console.log("ERROR: " + error);
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

