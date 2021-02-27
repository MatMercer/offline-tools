import Decimal from "decimal.js";

export const version = "1.0-beta";

export const defaultMathContext = {precision: 32, rounding: Decimal.ROUND_HALF_DOWN};

export class OfflineTools {
  constructor() {
    // TODO: get the configuration from cookies
    this._mathContext = new Decimal.clone(defaultMathContext);
  }

  get lang() {
    if (!this._lang) {
      this._lang = document.querySelector('meta[name="offlineTools.langCode"]').content;
    }

    return this._lang;
  }

  get mathContext() {
    return this._mathContext;
  }

  /**
   * @param {Decimal.Config} options
   */
  updateMathContext(options) {
    this._mathContext = this._mathContext.set(options);
  }
}

