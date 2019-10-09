const Benchmark = require('benchmark')
const Beautifier = require('beautify-benchmark')
const Encoder = require('../index')
const fs = require('fs')

const suite = new Benchmark.Suite()
const encoder = new Encoder()

suite.add(
	'encode(undefined)',
	function() {
		encoder.encode(undefined)
	},
	{
		minSamples: 100
	}
)

suite.add(
	'encode(null)',
	function() {
		encoder.encode(null)
	},
	{
		minSamples: 100
	}
)

suite.add(
	"encode('')",
	function() {
		encoder.encode('')
	},
	{
		minSamples: 100
	}
)

suite.add(
	"encode('a')",
	function() {
		encoder.encode('a')
	},
	{
		minSamples: 100
	}
)

suite.add(
	"encode('abcdefg')",
	function() {
		encoder.encode('abcdefg')
	},
	{
		minSamples: 100
	}
)

suite.add(
	"encode('<')",
	function() {
		encoder.encode('<')
	},
	{
		minSamples: 100
	}
)

suite.add(
	"encode('<em></em>')",
	function() {
		encoder.encode('<em></em>')
	},
	{
		minSamples: 100
	}
)

const smallDocument = fs
	.readFileSync(__dirname + '/assets/small.html')
	.toString()

suite
	.add(
		'encode a small document',
		function() {
			encoder.encode(smallDocument)
		},
		{
			minSamples: 100
		}
	)
	.on('cycle', function(event) {
		Beautifier.add(event.target)
	})
	.on('complete', () => {
		Beautifier.log()
	})
	.run({ async: false })
