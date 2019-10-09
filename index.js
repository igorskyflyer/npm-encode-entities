/**
 * Zero-dependency Map and RegExp based HTML entities encoder with Unicode support.
 *
 * @author Igor Dimitrijević <igor.dvlpr@gmail.com>
 * @license MIT
 * @copyright Igor Dimitrijević, 2019.
 *
 */

const MappedReplacer = require('mapped-replacer')

class Encoder {
	constructor() {
		this.replacer = new MappedReplacer()
		this.resetRules()
	}

	/**
	 * Resets the rules to the default ones.
	 * @returns {void}
	 */
	resetRules() {
		this.replacer.clearRules()
		this.replacer.addRules({
			'<': '&#60;',
			'>': '&#62;',
			'"': '&#34;',
			"'": '&#39;',
			'&': '&#38;',
			'=': '&#61;',
			'`': '&#96;',
			'!': '&#33;',
			'@': '&#64;',
			$: '&#36;',
			'%': '&#37;',
			'(': '&#40;',
			')': '&#41;',
			'+': '&#43;',
			'{': '&#123;',
			'}': '&#125;',
			'[': '&#91;',
			']': '&#93;'
		})
	}

	/**
	 * Adds a new rule or updates the existing rule for entity encoding.
	 * @param {string} key
	 * @param {string} value
	 * @return {boolean}
	 */
	addRule(key, value) {
		return this.replacer.addRule(key, value)
	}

	/**
	 * Adds an array of rules or updates the existing rules for entity encoding.
	 *
	 * Passed objects are simple key-value objects, i.e. { '<': '\&#60;' }
	 * @param {Object[]} rules
	 * @return {boolean}
	 */
	addRules(rules) {
		return this.replacer.addRules(rules)
	}

	/**
	 * Removes the rule that matches the provided key.
	 * @param {string} key
	 * @returns {boolean}
	 */
	removeRule(key) {
		return this.replacer.removeRule(key)
	}

	/**
	 * Gets the number of rules for entity encoding.
	 * @returns {number}
	 */
	rulesCount() {
		return this.replacer.rulesCount()
	}

	/**
	 * Encodes special characters in the given string to HTML entities.
	 * @param {string} input
	 * @returns {string}
	 */
	encode(input) {
		return this.replacer.replace(input)
	}
}

module.exports = Encoder
