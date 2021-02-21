import "../scss/style.scss"
import 'bootstrap';
import Vue from "vue/dist/vue.common.dev"

new Vue();

class OfflineTools {
  constructor() {
    this._lang = document.querySelector('meta[name="offlineTools.langCode"]').content;
  }

  get lang() {
    return this._lang;
  }
}

export const app = new OfflineTools();
