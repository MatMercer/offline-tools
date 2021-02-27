/**
 * @param {string} conversionKey
 * @param {Decimal} value
 */
export function convert(conversionKey, value) {
  if ("FC" === conversionKey) {
    return value.minus(32).times(5).dividedBy(9);
  }

  if ("CF" === conversionKey) {
    return value.times(9).dividedBy(5).plus(32);
  }
}
