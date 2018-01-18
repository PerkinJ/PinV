import * as d3 from 'd3'

// 随机产生离散数据
const randomData = () => d3.range(0, 100, 5)
	.map(key => ({
		key,
		value: Math.round(Math.random() * 80)
	}))

// // 计算层次数据节点的个数
// function calculateCount(data){
// 	let result = 0
// 	if (data.children){
// 		if (!!data.children&&data.children.length > 0){
// 			result = result + data.children.length
// 			console.log(result)
// 			calculateCount(data.children)
// 		} else {
// 			return result + 1
// 		}
// 	} else {
// 		return result+1
// 	}
// }
export {
	randomData
	// calculateCount
}
