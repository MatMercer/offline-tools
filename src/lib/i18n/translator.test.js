const assert = require('assert');
const Translator = require('./translator')

describe('Translator', () => {
  describe('#get()', () => {
    it('should give an error on invalid language', () => {
      assert.throws(() => {
        Translator.get('.', 'invalid');
      })
    });

    it('should load a language when file found', () => {
      Translator.get(__dirname, 'example.test');
    });
  });

  describe('#translate(key)', () => {
    it('should return the translation for a key', () => {
      const i = Translator.get(__dirname, 'example.test');
      assert.strictEqual(i('property'), 'value');
    });

    it('should return the key with question marks around when not found', () => {
      const i = Translator.get(__dirname, 'example.test');

      assert.strictEqual(i('notfound'), '??? notfound ???');
    });

    it('should find elements recursively', () => {
      const i = Translator.get(__dirname, 'example.test');

      assert.strictEqual(i('nested.key.value'), 'nested value');
    })

    it('should fail to find a invalid element recursively', () => {
      const i = Translator.get(__dirname, 'example.test');

      assert.strictEqual(i('nested.fail.value'), '??? nested.fail.value ???');
    })
  })
});
