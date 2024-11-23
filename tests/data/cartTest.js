import {addToCart, cart, loadCart, deleteFromCart, updateDeliveryOption} from "../../data/cart.js"

describe("Test Suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  })

  it("add existing item to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => { // this is called a mock, and mimics a method ("getItem method from the localStorage object")
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
        quantity: 1,
        deliveryOptionId: "1"
      }]);
    });
    loadCart();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // to check how many times the setItem method was called
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
      quantity: 2,
      deliveryOptionId: "1"
    }]));
  })

  it("add new item to the cart", () => { // this test can have multiple expectation and only passes if all of them pass
    spyOn(localStorage, "getItem").and.callFake(() => { // this is called a mock, and mimics a method ("getItem method from the localStorage object")
      return JSON.stringify([]);
    });
    loadCart();

    console.log(cart)
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // to check how many times the setItem method was called
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
      quantity: 1,
      deliveryOptionId: "1"
    }]));
  })
});

describe("test suite: deleteFromCart", () => {
  const prodId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
  const prodId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"

  beforeEach(() => {
    spyOn(localStorage, "setItem")
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
        quantity: 1,
        deliveryOptionId: "1"
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
        quantity: 3,
        deliveryOptionId: "1"
      }]);
    })
    loadCart();
  })

  it("remove a product id that is in the cart", () => {
    deleteFromCart(prodId1);
    expect(cart[0].productId).toEqual(prodId2)
  })

  it("remove a product id that is NOT in the cart", () => {
    deleteFromCart("qweyuio");
    expect(cart.length).toEqual(2)
    expect(cart[0].productId).toEqual(prodId1)
    expect(cart[1].productId).toEqual(prodId2)
  })
})

describe("test suite: update delivery option", () => {
  const prodId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
  const prodId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"

  beforeEach(() => {
    spyOn(localStorage, "setItem")
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
        quantity: 1,
        deliveryOptionId: "1"
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
        quantity: 3,
        deliveryOptionId: "1"
      }]);
    })
    loadCart();
  })
  
  it("update option of a product in the cart", () => {
    updateDeliveryOption(prodId1, "2")
    expect(cart.length).toEqual(2)
    expect(cart[0].deliveryOptionId).toEqual("2")
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
      quantity: 1,
      deliveryOptionId: "2"
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
      quantity: 3,
      deliveryOptionId: "1"
    }]))
  })

  it("update option of a product NOT in the cart", () => {
    updateDeliveryOption("yo", "2")
    expect(cart.length).toEqual(2)
    expect(cart[0].deliveryOptionId).toEqual("1")
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })

  it("update option of a product in the cart with a NON EXISTING deliveryid", () => {
    updateDeliveryOption(prodId2, "9")
    expect(cart.length).toEqual(2)
    expect(cart[0].deliveryOptionId).toEqual("1")
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })
})