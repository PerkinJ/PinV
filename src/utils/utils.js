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
