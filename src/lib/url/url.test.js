const assert = require('assert');
const url = require('./url.js');

describe('Url', () => {
  describe('#getUrlFor(resource)', () => {
    it('should return a url based in the root path', () => {
      const u = url.createHelper('/root');
      assert.strictEqual(u('testing'), '/root/testing');
      assert.strictEqual(u('testing/long/path?e=1234#id'), '/root/testing/long/path?e=1234#id');
    });
  })
});
