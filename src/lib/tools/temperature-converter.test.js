import {convert} from "./temperature-converter";
import {Decimal} from "decimal.js";
import assert from "assert";

Decimal.set({
  precision: 5,
  rounding: Decimal.ROUND_UP
});

describe('TemperatureConverter', () => {
  describe('#convert()', () => {
    it('should convert from F to C', () => {
      assert.strictEqual(convert("FC", new Decimal(32)).toString(), "0");
      assert.strictEqual(convert("FC", new Decimal(-34)).toString(), "-36.667");
    });

    it('should convert from C to F', () => {
      assert.strictEqual(convert("CF", new Decimal(0)).toString(), "32");
      assert.strictEqual(convert("CF", new Decimal("-36.667")).toString(), "-34.002");
    });
  });
})
