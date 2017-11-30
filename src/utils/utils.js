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
