const {resolve} = require("path");

class Translator {
  /**
   * Creates a translator with a desired language. Loads the file `${root}/${lang}.json` and uses it for the translation
   *
   * @param root Root directory for json translation files
   * @param lang The language desired
   */
  constructor(root, lang) {
    let jsonPath = resolve(`${root}/${lang}.json`);

    try {
      this.data = require(jsonPath);
    } catch (e) {
      throw `Translation file for language '${lang}' not found, please create '${jsonPath}'`;
    }
  }

  /**
   * Translates a key. Can be recursive. Returns a placeholder when the key is not found
   * @param key A key, eg: 'title', 'title.header', 'title.footer'
   * @returns {string|undefined}
   */
  translate(key) {
    let trans = this.lookup(key.split('.'), this.data, 0);
    if (!trans) {
      return `??? ${key} ???`;
    }
    return trans;
  }

  /**
   * Lookup recursively through the keys inside the translator. Returns undefined when not found
   *
   * @param path Key path, eg: ['nested', 'key']
   * @param data Current object for lookup of the key
   * @param curr Current position of the lookup path
   * @returns {*|undefined}
   */
  lookup(path, data, curr) {
    let currentNode = data[path[curr]];
    if (typeof currentNode === 'object') {
      return this.lookup(path, currentNode, curr + 1);
    }
    return currentNode;
  }

  /**
   * Returns a function that translate the key based in a language, example usage:
   *
   * ```
   * const i = Translator.get('./i18n', 'en-US');
   * const title = i('title.header');
   * ```
   *
   * @param root Root directory for json translation files
   * @param lang The language desired
   * @returns {function}
   */
  static get(root, lang) {
    const t = new Translator(root, lang);
    return t.translate.bind(t);
  }
}

module.exports = Translator;
