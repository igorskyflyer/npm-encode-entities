const map={
	'<': '&#60;',
	'=': '&#61;',
	'>': '&#62;',
	'&': '&#38;',
	'"': '&#34;',
	'#': '&#35;',
	'$': '&#36;',
	'\'': '&#39;',
	'(': '&#40;',
	')': '&#41;'
}

let expression=new RegExp('[<=>&\"#\\$\'\\(\\)]', 'g')

/**
 * Adds a new rule or updates the existing rule for entities encoding.
 * @param {String} from
 * @param {String} to
 * @return {void}
 */
function rule(from, to) {
	if (typeof from!=='string'||typeof to!=='string') {
		return
	}

	map[from]=to
	expression=new RegExp(`[${Object.keys(map).join((''))}]`, 'g')
}

/**
 * Encodes special characters in the given string to HTML entities.
 * @param {String} input
 * @returns {String}
 */
function encode(input) {
	if (typeof input!=='string') {
		return ''
	}

	let match=null
	let result=''
	let startIndex=0
	let lastIndex=0

	while (match=expression.exec(input)) {
		lastIndex=match.index
		result+=input.substring(startIndex, lastIndex)+map[input[lastIndex]]
		startIndex=lastIndex+1
	}

	if (input.length>startIndex) {
		result+=input.substring(startIndex)
	}

	return result
}

module.exports={
	rule, encode
}
