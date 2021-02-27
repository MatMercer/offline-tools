const assert = require('assert');
const url = require('./url.js');

describe('UrlHelper', () => {
  describe('#getUrlFor(resource)', () => {
    it('should return a url based in the root path', () => {
      const u = url.UrlHelper.createHelper('/root');
      assert.strictEqual(u('testing'), '/root/testing');
      assert.strictEqual(u('testing/long/path?e=1234#id'), '/root/testing/long/path?e=1234#id');
    });
  })
});

describe('RelativeUrlHelper', () => {
  describe('#getUrlFor(resource)', () => {
    it('should return a url based in the root path of the view', () => {
      const view = {
        path: "/new/path"
      }
      const r = url.RelativeUrlHelper.createHelper(view);
      assert.strictEqual(r('testing'), '/new/path/testing');
      assert.strictEqual(r('testing/long/path?e=1234#id'), '/new/path/testing/long/path?e=1234#id');
    });
  })
});

describe('TranslationUrlHelper', () => {
  describe('#getUrlFor(lang)', () => {
    it('should return a url based in the lang and root path of the view', () => {
      const view = {
        path: "/view/path",
        lang: "xx-XX"
      }
      const r = url.TranslateUrlHelper.createHelper("/", view, "en-US");
      assert.strictEqual(r('xx-XX'), '/xx-XX/view/path');
    });

    it('should ignore the lang path if it is the index language', () => {
      const view = {
        path: "/view/path",
        lang: "xx-XX"
      }
      const r = url.TranslateUrlHelper.createHelper("/", view, "xx-XX");
      assert.strictEqual(r('xx-XX'), '/view/path');
    })

    it('should respect the root path', () => {
      const view = {
        path: "/view/path",
        lang: "xx-XX"
      }
      const r = url.TranslateUrlHelper.createHelper("/new-root", view, "en-US");
      assert.strictEqual(r('xx-XX'), '/new-root/xx-XX/view/path');
    })
  })
});
