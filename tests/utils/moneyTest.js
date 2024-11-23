import { formatMoneyAmount } from "../../scripts/utils/money.js";

describe("Format Money Amount test suite", () => {
  it("converts cents into dollars", () => {
    expect(formatMoneyAmount(2095)).toEqual("20.95");
  });

  it("works with 0", () => {
    expect(formatMoneyAmount(0)).toEqual("0.00");
  })

  it("rounds up to the nearest cent", () => {
    expect(formatMoneyAmount(2000.5)).toEqual("20.01")
  })
});