// 数据转换函数库
import * as d3 from 'd3'

export function getPieData (data, key) {
	let pie = d3.pie().value((d) => d[key])
	return pie(data)
}
