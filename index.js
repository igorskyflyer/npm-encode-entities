const expressionWhitespace = /(\t|\n|\r)+/gm

let map = {
	'&': '&#38;',
	'!': '&#33;',
	'"': '&#34;',
	'#': '&#35;',
	'$': '&#36;',
	'%': '&#37;',
	'\'': '&#39;',
	'(': '&#40;',
	')': '&#41;',
	'*': '&#42;',
	'+': '&#43;',
	',': '&#44;',
	'-': '&#45;',
	'.': '&#46;',
	'/': '&#47;',
	':': '&#58;',
	';': '&#59;',
	'<': '&#60;',
	'=': '&#61;',
	'>': '&#62;',
	'?': '&#63;',
	'@': '&#64;',
	'[': '&#91;',
	'\\': '&#92;',
	']': '&#93;',
	'^': '&#94;',
	'_': '&#95;',
	'`': '&#96;',
	'{': '&#123;',
	'|': '&#124;',
	'}': '&#125;',
	'~': '&#126;'
}

function replaceAll(char) {
	return '&#' + char.charCodeAt(0) + ';'
}

function replaceMapped(char) {
	return map[char] || char
}

/**
 * Adds a new rule or updates the existing rule for entities encoding.
 * @param {String} from
 * @param {String} to
 * @return {void}
 */
function rule(from, to) {
	if (typeof from !== 'string' || typeof to !== 'string') {
		return
	}

	map[from] = to
}

/**
 * Encodes special characters in the given string to HTML entities.
 * @param {String} input
 * @param {Object} options
 * @returns {String}
 */
function encode(input, options = {}) {
	if (typeof input === 'string') {
		options = {
			encodeAll: options.encodeAll || false,
			stripWhitespace: options.stripWhitespace || false,
		}

		const expression = /./g

		if (options.encodeAll) {
			input = input.replace(expression, replaceAll)
		}
		else {
			input = input.replace(expression, replaceMapped)
		}

		if (options.stripWhitespace) {
			input = input.replace(expressionWhitespace, '')
		}

		return input
	}
	else {
		return ''
	}
}

module.exports = {
	rule, encode
}
