import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)

export default {
	input: './src/index.js',
	plugins: [
		babel(babelrc())
	],
	external,
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			name: 'PinV',
			sourcemap: true
		}
	]
}
