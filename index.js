const map = {
	'<': '&#60;',
	'=': '&#61;',
	'>': '&#62;',
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
	'/': '&#47;',
	':': '&#58;',
	';': '&#59;',
	'[': '&#91;',
	'\\': '&#92;',
	']': '&#93;',
	'^': '&#94;',
	'{': '&#123;',
	'|': '&#124;',
	'}': '&#125;',
	'~': '&#126;'
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
	let result = ''

	if (typeof input === 'string') {
		const count = input.length

		if (count === 0) {
			return ''
		}

		options = {
			encodeAll: options.encodeAll || false,
			stripWhitespace: options.stripWhitespace || false,
		}

		if (count <= 300) {
			let cursor = 0
			let char = ''

			if (options.encodeAll) {
				while (cursor < count) {
					char = input[cursor]

					if (options.stripWhitespace && (char === '\t' || char === '\r' || char === '\n')) {
						cursor++
						continue
					}

					result += '&#' + char.charCodeAt(0) + ';'
					cursor++
				}
			}
			else {
				while (cursor < count) {
					char = input[cursor]

					if (options.stripWhitespace && (char === '\t' || char === '\r' || char === '\n')) {
						cursor++
						continue
					}

					result += map[char] || char
					cursor++
				}
			}
		}
		else {
			const expression = /./g

			result = input.replace(expression, replaceMapped)

			if (options.stripWhitespace) {
				const expressionWhitespace = /[\t\n\r]+/gm

				result = result.replace(expressionWhitespace, '')
			}
		}
	}

	return result
}

module.exports = {
	rule, encode
}
