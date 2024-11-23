import {Clothing, Products, Appliance} from "../../data/products.js"
import { formatMoneyAmount } from "../../scripts/utils/money.js";
 
describe("test suite: Products class", () => {
  const prod1 = new Products({
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 1374,
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "womens",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });

  it("properties", () => {
    expect(prod1.id).toEqual("b0f17cc5-8b40-4ca5-9142-b61fe3d98c85")
    expect(prod1.image).toEqual("images/products/women-stretch-popover-hoodie-black.jpg")
    expect(prod1.name).toEqual("Women's Stretch Popover Hoodie")
    expect(prod1.rating).toEqual({
      stars: 4.5,
      count: 2465
    })
    expect(prod1.priceCents).toEqual(1374)
  })

  it("getStarsUrl method", () => {
    expect(prod1.getStarsUrl()).toEqual(`images/ratings/rating-${prod1.rating.stars * 10}.png`)
  })

  it("getPrice method", () => {
    expect(prod1.getPrice()).toEqual(`$${formatMoneyAmount(prod1.priceCents)}`)
  })

  it("extraInfoHTML method", () => {
    expect(prod1.extraInfoHTML()).toEqual("")
  })
})

describe("test suite: Clothing class", () => {
  const prod1 = new Clothing({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });

  it("properties", () => {
    expect(prod1.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
    expect(prod1.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg")
    expect(prod1.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack")
    expect(prod1.rating).toEqual({
      stars: 4.5,
      count: 56
    })
    expect(prod1.priceCents).toEqual(799)
    expect(prod1.sizeChartLink).toEqual("images/clothing-size-chart.png")
  })

  it("getStarsUrl method", () => {
    expect(prod1.getStarsUrl()).toEqual(`images/ratings/rating-${prod1.rating.stars * 10}.png`)
  })

  it("getPrice method", () => {
    expect(prod1.getPrice()).toEqual(`$${formatMoneyAmount(prod1.priceCents)}`)
  })

  it("extraInfoHTML method", () => {
    expect(prod1.extraInfoHTML()).toContain(prod1.sizeChartLink)
  })
})

describe("test suite: Appliance class", () => {
  const prod1 = new Appliance({
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type: "appliance",
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  });

  it("properties", () => {
    expect(prod1.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add")
    expect(prod1.image).toEqual("images/products/black-2-slot-toaster.jpg")
    expect(prod1.name).toEqual("2 Slot Toaster - Black")
    expect(prod1.rating).toEqual({
      stars: 5,
      count: 2197
    })
    expect(prod1.priceCents).toEqual(1899)
    expect(prod1.instructionsLink).toEqual("images/appliance-instructions.png")
    expect(prod1.warrantyLink).toEqual("images/appliance-warranty.png")
  })

  it("getStarsUrl method", () => {
    expect(prod1.getStarsUrl()).toEqual(`images/ratings/rating-${prod1.rating.stars * 10}.png`)
  })

  it("getPrice method", () => {
    expect(prod1.getPrice()).toEqual(`$${formatMoneyAmount(prod1.priceCents)}`)
  })

  it("extraInfoHTML method", () => {
    expect(prod1.extraInfoHTML()).toContain(prod1.instructionsLink && prod1.warrantyLink)
  })
})
