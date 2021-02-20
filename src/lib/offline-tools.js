class OfflineTools {
  constructor() {
    this._lang = document.querySelector('meta[name="offlineTools.langCode"]').content;
  }

  get lang() {
    return this._lang;
  }
}

const app = new OfflineTools();

module.exports = app;
