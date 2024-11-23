import {findDeliveryOption} from "./deliveryOptions.js"

let cart;
loadCart(); 

function addToCart(id, quantity) {
  let matchingItem = findCartItem(id);

  if (matchingItem) {
    matchingItem.quantity += parseInt(quantity)
  } else {
    cart.push({
      productId: id,
      quantity,
      deliveryOptionId: "1"
    })
  }

  saveCart();
}

function deleteFromCart(id) {
  cart.forEach((cartItem, index) => {
    if (cartItem.productId === id) {
      cart.splice(index, 1)
    }
  })

  saveCart();
}

function updateCartQuantity(id, newQuantity) {
  let matchingItem = findCartItem(id);

  matchingItem.quantity = newQuantity;

  saveCart();
}

function calculateCartQuantity() {
  let totalQuantity = 0;
  
  cart.forEach((cartItem) => {
    totalQuantity += parseInt(cartItem.quantity)
  });

  return totalQuantity
}

function updateDeliveryOption(id, deliveryOptionId) {
  let matchingItem = findCartItem(id);
  let matchingDeliveryOption = findDeliveryOption(deliveryOptionId);

  if (matchingItem && matchingDeliveryOption) {
    matchingItem.deliveryOptionId = matchingDeliveryOption.id
  } else {
    return
  }

  saveCart();
}

function deleteWholeCart() {
  cart = [];

  saveCart();
}

function findCartItem(id) {
  let matchingItem;

  cart.forEach((product) =>{
    if (id === product.productId) {
      matchingItem = product
    }
  });

  return matchingItem
}

async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  const text = await response.text();
  console.log(text);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

//Needed for tests
function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export {cart, addToCart, deleteFromCart, calculateCartQuantity, updateCartQuantity, updateDeliveryOption, loadCart, loadCartFetch, findCartItem, deleteWholeCart};