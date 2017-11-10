// 数据转换函数库
import * as d3 from 'd3'

export function getPieData (data, key,startAngle = 0,endAngle = 1) {
	// 限制在[0,1]之间
	if (startAngle >= endAngle || startAngle < 0 || startAngle > 1){
		startAngle = 0
	}
	if (endAngle <= startAngle || endAngle < 0 || endAngle > 1){
		endAngle = 1
	}
	let pie = d3.pie().startAngle(Math.PI * 2 * startAngle).endAngle(Math.PI * 2 * endAngle).value((d) => d[key])
	return pie(data)
}
