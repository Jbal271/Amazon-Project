import { loadCartFromBackend } from "./cart.js";
import { loadProducts } from "./products.js";

// REQUESTS
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => { 
  console.log(xhr.response); 
}) 

xhr.open("GET", "https://supersimplebackend.dev")
xhr.send();

// PROMISES
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  })

}).then((value) => {
  console.log(value)
  return new Promise((resolve) => {
    loadCartFromBackend(() => {
      resolve();
    });
  })

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})


