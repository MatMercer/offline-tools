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

module.exports = UrlHelper;
