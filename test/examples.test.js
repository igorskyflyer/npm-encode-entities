const Encoder = require('../encode-entities')
const assert = require('chai').assert

describe('examples', () => {
  describe('resetRules()', () => {
    it('should return "&#60;strong&#62;"', () => {
      const encoder = new Encoder()

      encoder.addRule('<', '😀')
      encoder.addRule('>', '😂')
      encoder.resetRules()

      assert.equal(encoder.encode('<strong>'), '&#60;strong&#62;')
    })
  })

  describe('addRule()', () => {
    it('should return &#60;a href&#61;&#34;#&#34;&#62;&#8594;&#60;/a&#62;', () => {
      const encoder = new Encoder()

      encoder.addRule('→', '&#8594;')
      assert.equal(encoder.encode('<a href="#">→</a>'), '&#60;a href&#61;&#34;#&#34;&#62;&#8594;&#60;/a&#62;')
    })
  })

  describe('addRules()', () => {
    it('should return "&#60;span&#62;&#120139; &#8776; &#120113;&#60;/span&#62;"', () => {
      const encoder = new Encoder()

      encoder.addRules({
        '𝕋': '&#120139;',
        '≈': '&#8776;',
        '𝔱': '&#120113;',
      })

      assert.equal(encoder.encode('<span>𝕋 ≈ 𝔱</span>'), '&#60;span&#62;&#120139; &#8776; &#120113;&#60;/span&#62;')
    })
  })

  describe('removeRule()', () => {
    it('should return 20', () => {
      const encoder = new Encoder()

      encoder.addRules({
        '𝕋': '&#120139;',
        '≈': '&#8776;',
        '𝔱': '&#120113;',
      })
      encoder.removeRule('≈')
      assert.equal(encoder.rulesCount(), 20)
    })
  })

  describe('rulesCount()', () => {
    it('shouldn return 21', () => {
      const encoder = new Encoder()

      encoder.addRules({
        '𝕋': '&#120139;',
        '≈': '&#8776;',
        '𝔱': '&#120113;',
      })

      assert.equal(encoder.rulesCount(), 21)
    })
  })

  describe('encode(string)', () => {
    it('should return "&#60;strong&#62;"', () => {
      const encoder = new Encoder()

      assert.equal(encoder.encode('<strong>'), '&#60;strong&#62;')
    })
  })
})
