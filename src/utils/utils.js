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
export const  bumps =(n, m) => {
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
