const encoder=require('../index')
const assert=require('chai').assert;

const htmlDocument=`
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

describe('Encode Entities', () => {
	describe('encode(undefined)', () => {
		it('should return an empty string', () => {
			const result=encoder.encode()
			assert.isEmpty(result)
		})
	})

	describe('encode(null)', () => {
		it('should return an empty string', () => {
			const result=encoder.encode(null)
			assert.isEmpty(result)
		})
	})

	describe('encode(\'\')', () => {
		it('should return an empty string', () => {
			const result=encoder.encode('')
			assert.isEmpty(result)
		})
	})

	describe('encode(string)', () => {
		it('should return an encoded string', () => {
			const result=encoder.encode('<strong>')
			assert.equal(result, '&#60;strong&#62;')
		})
	})

	describe('encode(string)', () => {
		it('shouldn\'t encode unsupported characters', () => {
			const result=encoder.encode('<a href="#">→</a>')
			assert.equal(result, '&#60;a href&#61;&#34;&#35;&#34;&#62;→&#60;/a&#62;')
		})
	})

	describe('encode(string) - multiline', () => {
		it('multiline support', () => {
			const result=encoder.encode(htmlDocument)
			assert.equal(result, '\n&#60;html&#62;\n\t&#60;head&#62;\n\t\t&#60;title&#62;Hello World&#60;/title&#62;\n\t&#60;/head&#62;\n\t&#60;body&#62;\n\t\t&#60;div class&#61;&#34;test-class&#34;&#62;\n\t\t\t&#60;form action&#61;&#34;&#34;&#62;\n\t\t\t\t&#60;input type&#61;&#34;text&#34; placeholder&#61;&#34;Test&#34; required&#62;\n\t\t\t&#60;/form&#62;\n\t\t&#60;/div&#62;\n\t&#60;/body&#62;\n&#60;/html&#62;\n')
		})
	})

	describe('rule(from, to)', () => {
		it('should encode with the new rule', () => {
			encoder.rule('→', '&#8594;')
			const result=encoder.encode('<a href="#">→</a>')
			assert.equal(result, '&#60;a href&#61;&#34;&#35;&#34;&#62;&#8594;&#60;/a&#62;')
		})
	})
})
