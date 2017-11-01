import { h } from 'preact'
import d3 from 'd3'
import DataCircles from './data-circles'
import XYAxis from './x-y-axis'
import Axis from '../Axis'
import styles from './index.less'
// 从数据集中返回最大的 X 坐标
const xMax = (data) => d3.max(data, (d) => d[0])

// 从数据集返回最大的 Y 坐标
const yMax = (data) => d3.max(data, (d) => d[1])

// 返回将数据缩放X坐标以适合图表的函数
const xScale = (props) => {
	return d3.scale.linear()
		.domain([0, xMax(props.data)])
		.range([props.padding, props.width - props.padding * 2])
}
// const quantize = d3.scale.quantize().domain([500,0]).range(['#888','#666','#444','#333','#000'])
// 返回将数据缩放Y坐标以适合图表的函数
const yScale = (props) => {
	return d3.scale.linear()
		.domain([0, yMax(props.data)])
		.range([props.height - props.padding, props.padding])
}
const data = d3.range(0, 120, 15)
	.map(key => ({
		key,
		value: 500 + Math.random() * 1500
	}))
export default (props) => {
	const scales = { xScale: xScale(props), yScale: yScale(props) }
	return <svg width={props.width} height={props.height}>
		<XYAxis {...props} {...scales} />
		<Axis
			hidden={false}
			type="x"
			dataKey="key"
			data={data}
			length={props.width}
			orient="bottom"
			textAnchor="middle"
			class={styles.axis}
			transform={"translate( 15,380)"} />
		<Axis
			hidden={false}
			type="y"
			dataKey="value"
			data={data}
			length={props.height}
			orient="left"
			textAnchor="middle"
			class={styles.axis}
			transform={"translate( 15,0)"} />

		<DataCircles {...props} {...scales} />
	</svg>
}
