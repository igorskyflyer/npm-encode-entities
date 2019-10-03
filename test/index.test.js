const encoder = require('../index')
const assert = require('chai').assert;

const htmlDocument = `
<html>
	<head>
		<title>Hello World</title>
	</head>
	<body>
		<div class="test-class">
			<form action="">
				<input type="text" placeholder="Test" required>
			</form>
		</div>
	</body>
</html>
`

describe('Encoding', () => {
	describe('', () => {
		it('empty string', () => {
			const result = encoder.encode('')
			assert.isEmpty(result)
		})

		it('encode tag', () => {
			const result = encoder.encode('<strong>')
			assert.equal(result, '&#60;strong&#62;')
		})

		it('don\'t encode unsupported entities', () => {
			const result = encoder.encode('<a href="#">→</a>')
			assert.equal(result, '&#60;a href&#61;&#34;&#35;&#34;&#62;→&#60;&#47;a&#62;')
		})

		it('add new rule', () => {
			encoder.addRule('→', '&#8594;')
			const result = encoder.encode('<a href="#">→</a>')
			assert.equal(result, '&#60;a href&#61;&#34;&#35;&#34;&#62;&#8594;&#60;&#47;a&#62;')
		})

		it('encode all chars', () => {
			const result = encoder.encode('<a href="#">→</a>', { encodeAll: true })
			assert.equal(result, '&#60;&#97;&#32;&#104;&#114;&#101;&#102;&#61;&#34;&#35;&#34;&#62;&#8594;&#60;&#47;&#97;&#62;')
		})

		it('multiline support', () => {
			const result = encoder.encode(htmlDocument)
			assert.equal(result, '\n&#60;html&#62;\n\t&#60;head&#62;\n\t\t&#60;title&#62;Hello World&#60;&#47;title&#62;\n\t&#60;&#47;head&#62;\n\t&#60;body&#62;\n\t\t&#60;div class&#61;&#34;test&#45;class&#34;&#62;\n\t\t\t&#60;form action&#61;&#34;&#34;&#62;\n\t\t\t\t&#60;input type&#61;&#34;text&#34; placeholder&#61;&#34;Test&#34; required&#62;\n\t\t\t&#60;&#47;form&#62;\n\t\t&#60;&#47;div&#62;\n\t&#60;&#47;body&#62;\n&#60;&#47;html&#62;\n')
		})

		it('strip whitespace', () => {
			const result = encoder.encode(htmlDocument, { stripWhitespace: true })
			assert.equal(result, '&#60;html&#62;&#60;head&#62;&#60;title&#62;Hello World&#60;&#47;title&#62;&#60;&#47;head&#62;&#60;body&#62;&#60;div class&#61;&#34;test&#45;class&#34;&#62;&#60;form action&#61;&#34;&#34;&#62;&#60;input type&#61;&#34;text&#34; placeholder&#61;&#34;Test&#34; required&#62;&#60;&#47;form&#62;&#60;&#47;div&#62;&#60;&#47;body&#62;&#60;&#47;html&#62;')
		})
	})
})
