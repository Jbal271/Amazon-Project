import {findDeliveryOption} from "./deliveryOptions.js"

function Cart(localStorageKey) { // for things that generate objects, use PascalCase
  const cart = {
    cartItems: undefined,
  
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
    },
  
    deleteFromCart(id) {
      this.cartItems.forEach((cartItem, index) => {
        if (cartItem.productId === id) {
          this.cartItems.splice(index, 1)
        }
      })
    
      this.saveCart();
    },
  
    updateCartQuantity(id, newQuantity) {
      let matchingItem = this.findCartItem(id);
    
      matchingItem.quantity = newQuantity;
    
      this.saveCart();
    },
  
    calculateCartQuantity() {
      let totalQuantity = 0;
      
      this.cartItems.forEach((cartItem) => {
        totalQuantity += parseInt(cartItem.quantity)
      });
    
      return totalQuantity
    },
  
    updateDeliveryOption(id, deliveryOptionId) {
      let matchingItem = this.findCartItem(id);
      let matchingDeliveryOption = findDeliveryOption(deliveryOptionId);
    
      if (matchingItem && matchingDeliveryOption) {
        matchingItem.deliveryOptionId = matchingDeliveryOption.id
      } else {
        return
      }
    
      this.saveCart();
    },
  
    findCartItem(id) {
      let matchingItem;
    
      this.cartItems.forEach((product) =>{
        if (id === product.productId) {
          matchingItem = product
        }
      });
    
      return matchingItem
    },
    
    loadCart() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
    
    saveCart() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
    }
  }

  return cart
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadCart(); 
businessCart.loadCart(); 
console.log(cart)
console.log(businessCart)