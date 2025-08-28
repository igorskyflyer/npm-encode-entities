// Author: Igor Dimitrijević (@igorskyflyer)

import { assert, beforeEach, describe, suite, test } from 'vitest'
import { Encoder } from '../src/index.mjs'

let encoder: Encoder

describe('🧪 Encode Entities tests (examples) 🧪', () => {
  beforeEach(() => {
    encoder = new Encoder()
  })

  suite('resetRules()', () => {
    test('#1 should return "&#60;strong&#62;"', () => {
      encoder.updateRule('😀', '<')
      encoder.updateRule('😂', '>')
      encoder.resetRules()

      assert.equal(encoder.encode('<strong>'), '&#60;strong&#62;')
    }) // #1
  })

  suite('addRule()', () => {
    test('#2 should return &#60;a href&#61;&#34;#&#34;&#62;&#8594;&#60;/a&#62;', () => {
      encoder.addRule('&#8594;', '→')

      assert.equal(
        encoder.encode('<a href="#">→</a>'),
        '&#60;a href&#61;&#34;#&#34;&#62;&#8594;&#60;/a&#62;'
      )
    }) // #2
  })

  suite('addRules()', () => {
    test('#3 should return "&#60;span&#62;&#120139; &#8776; &#120113;&#60;/span&#62;"', () => {
      encoder.addRules({
        '&#120139;': '𝕋',
        '&#8776;': '≈',
        '&#120113;': '𝔱'
      })

      assert.equal(
        encoder.encode('<span>𝕋 ≈ 𝔱</span>'),
        '&#60;span&#62;&#120139; &#8776; &#120113;&#60;/span&#62;'
      )
    }) // #3
  })

  suite('removeRule()', () => {
    test('#4 should return 20', () => {
      encoder.addRules({
        '&#120139;': '𝕋',
        '&#8776;': '≈',
        '&#120113;': '𝔱'
      })

      encoder.removeRule('≈')

      assert.equal(encoder.rulesCount(), 20)
    }) // #4
  })

  suite('rulesCount()', () => {
    test('#5 should return 21', () => {
      encoder.addRules({
        '&#120139;': '𝕋',
        '&#8776;': '≈',
        '&#120113;': '𝔱'
      })

      assert.equal(encoder.rulesCount(), 21)
    }) // #5
  })

  suite('encode(string)', () => {
    test('#6 should return "&#60;strong&#62;"', () => {
      assert.equal(encoder.encode('<strong>'), '&#60;strong&#62;')
    }) // #6
  })
})
