import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // --> ESM version (EcmaScript version = Javascript); default export because there is not curly brackets

const deliveryOptions = [{
  id: "1",
  deliveryTime: 7,
  priceCents: 0
}, {
  id: "2",
  deliveryTime: 3,
  priceCents: 499
}, {
  id: "3",
  deliveryTime: 1,
  priceCents: 999
}];

function findDeliveryOption(deliveryOptionId) {
  let matchingDeliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingDeliveryOption = option;
    }
  });

  return matchingDeliveryOption
}

function calculateDeliveryDate(deliveryOption) {
  const date = dayjs();
  let daysToDeliver = deliveryOption.deliveryTime;

  // Skip weekend delivery days
  while (date.add(daysToDeliver, "days").format("ddd") === "Sat" || date.add(daysToDeliver, "days").format("ddd") === "Sun") {
    daysToDeliver ++
  }

  return date.add(daysToDeliver, "days").format("dddd, MMMM D");
}

export {deliveryOptions, findDeliveryOption, calculateDeliveryDate}