import { h,Component } from 'preact'
import * as d3 from 'd3'
import DataCircles from './data-circles'
import Axis from '../Axis'
import styles from './index.less'
// 从数据集中返回最大的 X 坐标
const xMax = (data, key) => d3.max(data, (d) => d[key])

// 从数据集返回最大的 Y 坐标
const yMax = (data, key) => d3.max(data, (d) => d[key])

// 返回将数据缩放X坐标以适合图表的函数
const xScale = (props) => {
	let { padding, data, XAxis, width } = props
	return d3.scaleLinear()
		.domain([0, xMax(data, XAxis)])
		.range([padding.left, width - padding.left])
}
// const quantize = d3.scale.quantize().domain([500,0]).range(['#888','#666','#444','#333','#000'])
// 返回将数据缩放Y坐标以适合图表的函数
const yScale = (props) => {
	let { data, YAxis, height, padding } = props
	return d3.scaleLinear()
		.domain([0, yMax(data, YAxis)])
		.range([height - padding.top - padding.bottom, padding.top])
}
class ScatterPlot extends Component{
	static defaultProps = {
		width: 600,
		height: 400,
		padding: { top: 32, bottom: 32, left: 20, right: 20 },
		// left: 40,
		tickSize: 5,
		tickFormat: '',
		stroke:'#673ab7',
		r:4,
		color:'#ff0'
	}
	render(props){
		const scales = { xScale: xScale(props), yScale: yScale(props) }
		let { width, height, padding, data, tickSize = 5,tickFormat,stroke, XAxis, YAxis} = props
		let dWidth = width - padding.left - padding.right -data.length/2,  // 这里要减去每个circle的半径
			dHeight = height - padding.top - padding.bottom
		return <svg width={width + padding.left + padding.right} height={height + padding.top + padding.bottom}>
			<Axis
				hidden={false}
				type="x"
				dataKey={XAxis}
				data={data}
				length={dWidth}
				orient="bottom"
				stroke={stroke}
				textAnchor="middle"
				class={styles.axis}
				transform={`translate(${padding.left},${height - padding.top} )`} />
			<Axis
				hidden={false}
				type="y"
				dataKey={YAxis}
				data={data}
				length={dHeight}
				orient="left"
				tickSize={tickSize}
				tickFormat={tickFormat}
				textAnchor="end"
				stroke={stroke}
				class={styles.axis}
				transform={`translate(${padding.left},${padding.top})`} />
			<DataCircles {...props} {...scales} />
		</svg>
	}
}
export default ScatterPlot
