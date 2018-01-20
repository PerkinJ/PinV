import * as d3 from 'd3'
// 检测color的格式是否是hsl形式
export function handleD3Color(str) {
	if (str && typeof str === 'string') {
		if (str.indexOf('hsl') > -1) {
			return d3.hsl(str)
		} else {
			return d3.rgb(str)
		}
	}
}

// 颜色生成器
export function colorGenerator(numberOfSteps) {
	const colors = d3.range(numberOfSteps).map((index) => d3.hsl((360 / numberOfSteps) * index, 0.8, 0.64))
	return (index) => colors[index]
}

// 监听器
export function addEvent(obj, type, fn) {
	if (obj.attachEvent) {
		obj['e' + type + fn] = fn
		obj[type + fn] = function () { obj['e' + type + fn](window.event) }
		obj.attachEvent('on' + type, obj[type + fn])
	} else
		obj.addEventListener(type, fn, false)
}

export function removeEvent(obj, type, fn) {
	if (obj.detachEvent) {
		obj.detachEvent('on' + type, obj[type + fn])
		obj[type + fn] = null
	} else
		obj.removeEventListener(type, fn, false)
}



/**
 * Color scale generator
 * @returns {function} color generator
 */
export const colour = (() => {
	const scale = d3.scaleOrdinal(d3.schemeCategory20)
	return (num) => parseInt(scale(num).slice(1), 16)
})()


// Inspired by Lee Byron’s test data generator.
export const bumps = (n, m) => {
	let a = [], i
	for (i = 0; i < n; ++i) a[i] = 0
	for (i = 0; i < m; ++i) bump(a, n)
	return a
}

function bump(a, n) {
	let x = 1 / (0.1 + Math.random()),
		y = 2 * Math.random() - 0.5,
		z = 10 / (0.1 + Math.random())
	for (let i = 0; i < n; i++) {
		let w = (i / n - y) * z
		a[i] += x * Math.exp(-w * w)
	}
}

exports.shade = (hex, percent) => {
	let R, G, B, red, green, blue, number
	let min = Math.min, round = Math.round
	if (hex.length !== 7) { return hex }
	number = parseInt(hex.slice(1), 16)
	R = number >> 16
	G = number >> 8 & 0xFF
	B = number & 0xFF
	red = min(255, round((1 + percent) * R)).toString(16)
	if (red.length === 1) red = '0' + red
	green = min(255, round((1 + percent) * G)).toString(16)
	if (green.length === 1) green = '0' + green
	blue = min(255, round((1 + percent) * B)).toString(16)
	if (blue.length === 1) blue = '0' + blue
	return `#${red}${green}${blue}`
}

exports.calculateScales = (chartWidth, chartHeight, xValues, yValues, xDomain, yDomain) => {

	let xScale, yScale, xdomain, ydomain
	xDomain = xDomain || [], yDomain = yDomain || []
	if (xValues.length > 0 && Object.prototype.toString.call(xValues[0]) === '[object Date]') {
		xScale = d3.scaleTime()
			.range([0, chartWidth])
	} else {
		xScale = d3.scaleLinear()
			.range([0, chartWidth])
	}
	xdomain = d3.extent(xValues)
	if (xDomain[0] !== undefined && xDomain[0] !== null) xdomain[0] = xDomain[0]
	if (xDomain[1] !== undefined && xDomain[1] !== null) xdomain[1] = xDomain[1]
	xScale.domain(xdomain)

	if (yValues.length > 0 && Object.prototype.toString.call(yValues[0]) === '[object Date]') {
		yScale = d3.scaleTime()
			.range([chartHeight, 0])
	} else {
		yScale = d3.scaleLinear()
			.range([chartHeight, 0])
	}

	ydomain = d3.extent(yValues)
	if (yDomain[0] !== undefined && yDomain[0] !== null) ydomain[0] = yDomain[0]
	if (yDomain[1] !== undefined && yDomain[1] !== null) ydomain[1] = yDomain[1]
	yScale.domain(ydomain)

	return {
		xScale,
		yScale
	}

}

exports.flattenData = (data, xAccessor, yAccessor) => {

	let allValues = []
	let xValues = []
	let yValues = []
	let coincidentCoordinateCheck = {}

	data.forEach((series, i) => {
		series.values.forEach((item, j) => {

			let x = xAccessor(item)

			// Check for NaN since d3's Voronoi cannot handle NaN values
			// Go ahead and Proceed to next iteration since we don't want NaN
			// in allValues or in xValues or yValues
			if (isNaN(x)) {
				return
			}
			xValues.push(x)

			let y = yAccessor(item)
			// when yAccessor returns an object (as in the case of candlestick)
			// iterate over the keys and push all the values to yValues array
			let yNode
			if (typeof y === 'object' && Object.keys(y).length > 0) {
				Object.keys(y).forEach(function (key) {
					// Check for NaN since d3's Voronoi cannot handle NaN values
					// Go ahead and Proceed to next iteration since we don't want NaN
					// in allValues or in xValues or yValues
					if (isNaN(y[key])) {
						return
					}
					yValues.push(y[key])
					// if multiple y points are to be plotted for a single x
					// as in the case of candlestick, default to y value of 0
					yNode = 0
				})
			} else {
				// Check for NaN since d3's Voronoi cannot handle NaN values
				// Go ahead and Proceed to next iteration since we don't want NaN
				// in allValues or in xValues or yValues
				if (isNaN(y)) {
					return
				}
				yValues.push(y)
				yNode = y
			}

			let xyCoords = `${x}-${yNode}`
			if (coincidentCoordinateCheck.hasOwnProperty(xyCoords)) {
				// Proceed to next iteration if the x y pair already exists
				// d3's Voronoi cannot handle NaN values or coincident coords
				// But we push them into xValues and yValues above because
				// we still may handle them there (labels, etc.)
				return
			}
			coincidentCoordinateCheck[xyCoords] = ''

			let pointItem = {
				coord: {
					x,
					y: yNode
				},
				d: item,
				id: series.name + j,
				series,
				seriesIndex: i
			}
			allValues.push(pointItem)
		})
	})

	return {
		allValues,
		xValues,
		yValues
	}
}
