const Benchmark = require('benchmark')
const Encoder = require('../index')
const fs = require('fs')

const suite = new Benchmark.Suite()

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

suite.add('encode small document', function () {
	Encoder.encode(htmlDocument)
}, {
	'minSamples': 100
})

const largeDocument = fs.readFileSync(__dirname + '/assets/large.html')

suite.add('encode large document', function () {
	Encoder.encode(largeDocument)
}, {
	'minSamples': 100
})
	.on('cycle', function (event) {
		console.log(String(event.target));
	})
	.run({ 'async': true })
