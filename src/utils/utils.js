import * as d3 from 'd3'
import _ from 'lodash'
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

// 数据求和,返回求和结果
export function summation(arr,key){
	return _.map(arr,key).reduce((previousValue, currentValue) =>
		 Number(previousValue) + Number(currentValue)
	)
}
