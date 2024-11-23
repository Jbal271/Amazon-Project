import { formatMoneyAmount } from "../../scripts/utils/money.js";

console.log("Format Money Amount TEST SUITE:")

console.log("CONVERTS CENTS INTO DOLLARS")

if (formatMoneyAmount(2095) === "20.95") {
  console.log("passed")
} else {
  console.log("failed")
}

if (formatMoneyAmount(2000.4) === "20.00") {
  console.log("passed")
} else {
  console.log("failed")
}

if (formatMoneyAmount(-2007.9) === "-20.08") {
  console.log("passed")
} else {
  console.log("failed")
}