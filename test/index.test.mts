// Author: Igor Dimitrijević (@igorskyflyer)

import { assert, beforeEach, describe, suite, test } from 'vitest'
import { Encoder } from '../src/index.mjs'

const htmlDocument: string = `
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

let encoder: Encoder

describe('🧪 Encode Entities tests 🧪', () => {
	beforeEach(() => {
		encoder = new Encoder()
	})

	suite('encode(undefined)', () => {
		test('#1 should return an empty string', () => {
			// @ts-expect-error
			const result: string = encoder.encode()

			assert.isEmpty(result)
		}) // #1
	})

	suite('encode(null)', () => {
		test('#2 should return an empty string', () => {
			//@ts-expect-error
			const result: string = encoder.encode(null)

			assert.isEmpty(result)
		}) // #2
	})

	suite("encode('')", () => {
		test('#3 should return an empty string', () => {
			const result: string = encoder.encode('')

			assert.isEmpty(result)
		}) // #3
	})

	suite('encode(string)', () => {
		test('#4 should return an encoded string', () => {
			const result: string = encoder.encode('<strong>')

			assert.equal(result, '&#60;strong&#62;')
		}) // #4
	})

	suite('encode(string)', () => {
		test("#5 shouldn't encode unsupported characters", () => {
			const result: string = encoder.encode('<a href="#">→</a>')

			assert.equal(result, '&#60;a href&#61;&#34;#&#34;&#62;→&#60;/a&#62;')
		}) // #5
	})

	suite('encode(string) - multiline', () => {
		test('#6 multiline support', () => {
			const result: string = encoder.encode(htmlDocument)

			assert.equal(
				result,
				'\n&#60;html&#62;\n\t&#60;head&#62;\n\t\t&#60;title&#62;Hello World&#60;/title&#62;\n\t&#60;/head&#62;\n\t&#60;body&#62;\n\t\t&#60;div class&#61;&#34;test-class&#34;&#62;\n\t\t\t&#60;form action&#61;&#34;&#34;&#62;\n\t\t\t\t&#60;input type&#61;&#34;text&#34; placeholder&#61;&#34;Test&#34; required&#62;\n\t\t\t&#60;/form&#62;\n\t\t&#60;/div&#62;\n\t&#60;/body&#62;\n&#60;/html&#62;\n'
			)
		}) // #6
	})

	suite('rulesCount()', () => {
		test('#7 should return 18', () => {
			const result: number = encoder.rulesCount()

			assert.equal(result, 18)
		}) // #7
	})

	suite('addRule(from, to)', () => {
		test('#8 should encode with the new rule', () => {
			encoder.addRule('→', '&#8594;')

			const result: string = encoder.encode('<a href="#">→</a>')

			assert.equal(
				result,
				'&#60;a href&#61;&#34;#&#34;&#62;&#8594;&#60;/a&#62;'
			)
		}) // #8
	})

	suite('rulesCount() after addRule()', () => {
		test('#9 should return 19', () => {
			encoder.addRule('→', '&#8594;')

			const result: number = encoder.rulesCount()

			assert.equal(result, 19)
		}) // #9
	})

	suite('addRules({})', () => {
		test('#10 should encode with the new rules', () => {
			encoder.addRules({
				𝕋: '&#120139;',
				'≈': '&#8776;',
				𝔱: '&#120113;'
			})

			const result: string = encoder.encode('<span>𝕋 ≈ 𝔱</span>')

			assert.equal(
				result,
				'&#60;span&#62;&#120139; &#8776; &#120113;&#60;/span&#62;'
			)
		}) // #10
	})

	suite('rulesCount() after addRules({})', () => {
		test('#11 should return 21', () => {
			encoder.addRules({
				𝕋: '&#120139;',
				'≈': '&#8776;',
				𝔱: '&#120113;'
			})

			const result: number = encoder.rulesCount()

			assert.equal(result, 21)
		}) // #11
	})

	suite('rulesCount() after removeRule()', () => {
		test('#12 should return 20', () => {
			encoder.addRules({
				𝕋: '&#120139;',
				'≈': '&#8776;',
				𝔱: '&#120113;'
			})
			encoder.removeRule('≈')

			const result: number = encoder.rulesCount()

			assert.equal(result, 20)
		}) // #12
	})

	suite('resetRules() with encode()', () => {
		test('#13 should return an encoded string', () => {
			encoder.addRule('<', '😀')
			encoder.addRule('>', '😂')
			encoder.resetRules()

			const result: string = encoder.encode('<strong>')

			assert.equal(result, '&#60;strong&#62;')
		}) // #13
	})
})
