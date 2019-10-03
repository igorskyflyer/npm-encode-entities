const Benchmark = require('benchmark')
const Beautifier = require('beautify-benchmark')
const Encoder = require('../index')
const fs = require('fs')

const suite = new Benchmark.Suite()

suite.add('empty string', function () {
	Encoder.encode('')
}, {
	'minSamples': 100
})

suite.add('non special character', function () {
	Encoder.encode('a')
}, {
	'minSamples': 100
})

suite.add('non special characters', function () {
	Encoder.encode('abc')
}, {
	'minSamples': 100
})

suite.add('encode a single character', function () {
	Encoder.encode('<')
}, {
	'minSamples': 100
})

suite.add('encode a single tag', function () {
	Encoder.encode('<strong></strong>')
}, {
	'minSamples': 100
})

const smallDocument = fs.readFileSync(__dirname + '/assets/small.html').toString()

suite.add('encode small document', function () {
	Encoder.encode(smallDocument)
}, {
	'minSamples': 100
})

const largeDocument = fs.readFileSync(__dirname + '/assets/large.html').toString()

suite.add('encode large document', function () {
	Encoder.encode(largeDocument)
}, {
	'minSamples': 100
})
	.on('cycle', function (event) {
		Beautifier.add(event.target)
	})
	.on('complete', () => {
		Beautifier.log()
	})
	.run({ 'async': false })
