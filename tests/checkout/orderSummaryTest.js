import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js"
import {calculateCartQuantity, cart, loadCart} from "../../data/cart.js"
import { formatMoneyAmount } from "../../scripts/utils/money.js"
import {loadProductsFetch} from "../../data/products.js"

describe("Test suite: Order Summary", () => {
  const prodId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
  const prodId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
  const prodName1 = "Black and Gray Athletic Cotton Socks - 6 Pairs"
  const prodName2 = "Intermediate Size Basketball"
  const prodPriceCents1 = 1090
  const prodPriceCents2 = 2095

  beforeAll(async () => {
    await loadProductsFetch()
  })

  beforeEach(() => {
    spyOn(localStorage, "setItem")

    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-element"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
        quantity: 1,
        deliveryOptionId: "1"
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
        quantity: 2,
        deliveryOptionId: "1"
      }]);
    });

    loadCart();

    renderOrderSummary();
  })

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = ""
  })

  it("displays the cart", () => {
    expect(
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(2)
    expect(
      document.querySelector(`.js-product-quantity-${prodId1}`).innerText
    ).toContain("Quantity: 1")
    expect(
      document.querySelector(`.js-product-quantity-${prodId2}`).innerText
    ).toContain("Quantity: 2")
    expect(
      document.querySelector(`.js-product-name-${prodId1}`).innerText
    ).toEqual(prodName1)
    expect(
      document.querySelector(`.js-product-name-${prodId2}`).innerText
    ).toEqual(prodName2)
    expect(
      document.querySelector(`.js-product-price-${prodId1}`).innerText
    ).toEqual(`$${formatMoneyAmount(prodPriceCents1)}`)
    expect(
      document.querySelector(`.js-product-price-${prodId2}`).innerText
    ).toEqual(`$${formatMoneyAmount(prodPriceCents2)}`)
  });

  it("removes from the cart", () => {
    document.querySelector(`.js-delete-link-${prodId1}`).click() // Clicks a button from the code
    expect(
      document.querySelectorAll(`.js-cart-item-container`).length
    ).toEqual(1)
    expect(
      document.querySelector(`.js-cart-item-container-${prodId1}`)
    ).toEqual(null)
    expect(
      document.querySelector(`.js-cart-item-container-${prodId2}`)
    ).not.toEqual(null)
    expect(
      calculateCartQuantity()
    ).toEqual(2)
    expect(
      cart.length
    ).toEqual(1)
    expect(
      cart[0].productId
    ).toEqual(prodId2)
  })
  
  it("updating delivery option", () => {
    document.querySelector(`.js-delivery-option-${prodId1}-3`).click();
    const input = document.querySelector(`.js-delivery-option-input-${prodId1}-3`)
    expect(input.checked).toEqual(true)
    expect(
      cart.length
    ).toEqual(2)
    expect(
      cart[0].productId
    ).toEqual(prodId1)
    expect(
      cart[0].deliveryOptionId
    ).toEqual("3")
    expect(
      cart[1].productId
    ).toEqual(prodId2)
    expect(
      cart[1].deliveryOptionId
    ).toEqual("1")
  })
})