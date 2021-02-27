const path = require("path");

class UrlHelper {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  getUrlFor(resource) {
    return path.join("/", this.rootPath, resource);
  }

  static createHelper(rootPath) {
    const u = new UrlHelper(rootPath);
    return u.getUrlFor.bind(u);
  }
}

class RelativeUrlHelper extends UrlHelper {
  static createHelper(view) {
    const u = new RelativeUrlHelper(view.path)
    return u.getUrlFor.bind(u);
  }
}

class TranslateUrlHelper extends UrlHelper {
  constructor(rootPath, viewPath, indexLang) {
    super(rootPath);
    this.viewPath = viewPath;
    this.indexLang = indexLang;
  }

  getUrlFor(lang) {
    let langPath = lang;
    if (lang === this.indexLang) {
      langPath = "/"
    }
    return path.join(this.rootPath, langPath, this.viewPath);
  }

  static createHelper(rootPath, view, indexLang) {
    const u = new TranslateUrlHelper(rootPath, view.path, indexLang);
    return u.getUrlFor.bind(u);
  }

}

module.exports = {
  UrlHelper,
  RelativeUrlHelper,
  TranslateUrlHelper
};
