import {OfflineTools} from "./offline-tools";

const assert = require('assert');

const Decimal = require("decimal.js")
require('jsdom-global')()

const exampleLang = "en-US";

describe('OfflineTools', () => {
  before(function (done) {
    const metaTag = document.createElement('meta');
    metaTag.name = "offlineTools.langCode";
    metaTag.content = exampleLang;
    document.head.appendChild(metaTag);

    done();
  });

  describe('#getLang()', () => {
    it('should return the site language based in the metatag', () => {

      const app = new OfflineTools();

      assert.strictEqual(app.lang, exampleLang);
    });
  });

  describe("#decimal()", () => {
    it('should return a Decimal from math context', () => {
      const app = new OfflineTools();

      assert.strictEqual(app.mathContext.precision, 32);
      assert.strictEqual(app.mathContext.rounding, Decimal.ROUND_HALF_DOWN);
    })

    it('should update the math context from options', () => {
      const app = new OfflineTools();

      app.updateMathContext({
        precision: 32,
        rounding: Decimal.ROUND_HALF_EVEN
      });

      assert.strictEqual(app.mathContext.precision, 32);
      assert.strictEqual(app.mathContext.rounding, Decimal.ROUND_HALF_EVEN);
    })
  });
})
