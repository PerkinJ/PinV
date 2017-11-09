import { h,Component } from 'preact'
import * as d3 from 'd3'
import Axis from '../Axis'
import styles from './index.less'
import DataCircles from '../ScatterPlot/data-circles'

class LineChart extends Component{
	static defaultProps = {
		width: 600,
		height: 400,
		padding: { top: 32, bottom: 32, left: 20, right: 20 },
		// left: 40,
		tickSize: 5,
		tickFormat: '',
		stroke:'#673ab7',
		shape:'curveCardinal',
		r:2,
		color:'rgb(255,0,0)'
	}
	render(props){
		let { width, height, padding, data, XAxis, YAxis, tickSize = 5,tickFormat,stroke,shape } = props
		let dWidth = width - padding.left - padding.right -data.length/2,  // 这里要减去每个circle的半径
			dHeight = height - padding.top - padding.bottom

		let xDomain = d3.max(data, (d) => d[XAxis]),
			yDomain = d3.max(data, (d) => d[YAxis])
		let scaleX = d3.scaleLinear()
			.domain([0, xDomain])
			.range([0, dWidth])
		let scaleY = d3.scaleLinear()
			.domain([0, yDomain])
			.range([dHeight, padding.bottom])
		let linePath = d3.line()
			.x((d)=>scaleX(d[XAxis]))
			.y((d)=>scaleY(d[YAxis]))
			.curve(d3[shape])
		const lineProps = {
			stroke,
			fill:'none',
			d:linePath(data),
			transform:`translate(${padding.left +10},${padding.top})`
		}
		   // v4与v3的区别 v3的interpolate不再使用  https://github.com/d3/d3-shape/blob/master/README.md#curves
		return <svg width={width + padding.left + padding.right} height={height + padding.top + padding.bottom}>
			<Axis
				hidden={false}
				type="x"
				dataKey="key"
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
				dataKey="value"
				data={data}
				length={dHeight}
				orient="left"
				tickSize={tickSize}
				tickFormat={tickFormat}
				textAnchor="end"
				stroke={stroke}
				class={styles.axis}
				transform={`translate(${padding.left},${padding.top})`} />
			<path class={styles.line} {...lineProps}/>
			<g transform={`translate(${padding.left - props.r},0)`} >
				<DataCircles
					xScale={scaleX}
					yScale={scaleY}
					{...props}
				/>
			 </g>
		</svg>
	}
}
export default LineChart
