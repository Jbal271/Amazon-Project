import {findDeliveryOption} from "./deliveryOptions.js"

class Cart {
  cartItems;
  #localStorageKey; // private property (can only be accessed from inside)

  constructor(localStorageKey) { // runs automatically when an object is generated
    this.#localStorageKey = localStorageKey;
    this.#loadCart()
  }

  addToCart(id, quantity) {
    let matchingItem = this.findCartItem(id);
  
    if (matchingItem) {
      matchingItem.quantity += parseInt(quantity)
    } else {
      this.cartItems.push({
        productId: id,
        quantity,
        deliveryOptionId: "1"
      })
    }
  
    this.saveCart();
  };

  deleteFromCart(id) {
    this.cartItems.forEach((cartItem, index) => {
      if (cartItem.productId === id) {
        this.cartItems.splice(index, 1)
      }
    })
  
    this.saveCart();
  };

  updateCartQuantity(id, newQuantity) {
    let matchingItem = this.findCartItem(id);
  
    matchingItem.quantity = newQuantity;
  
    this.saveCart();
  };

  calculateCartQuantity() {
    let totalQuantity = 0;
    
    this.cartItems.forEach((cartItem) => {
      totalQuantity += parseInt(cartItem.quantity)
    });
  
    return totalQuantity
  };

  updateDeliveryOption(id, deliveryOptionId) {
    let matchingItem = this.findCartItem(id);
    let matchingDeliveryOption = findDeliveryOption(deliveryOptionId);
  
    if (matchingItem && matchingDeliveryOption) {
      matchingItem.deliveryOptionId = matchingDeliveryOption.id
    } else {
      return
    }
  
    this.saveCart();
  };

  findCartItem(id) {
    let matchingItem;
  
    this.cartItems.forEach((product) =>{
      if (id === product.productId) {
        matchingItem = product
      }
    });
  
    return matchingItem
  };

  #loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  };

  saveCart() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
  };
}

export {Cart}

/* EXPERIMENTS
const cart = new Cart("cart-oop"); // each new object is an INSTANCE of the Class
const businessCart = new Cart("cart-business");

cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 8)
console.log(cart);
console.log(businessCart);
*/ 