import { h, Component } from 'preact'
import * as d3 from 'd3'
import Circles from '../../basic/Circles'
import Tooltip from '../../basic/Tooltip'
import Axis from '../../basic/Axis'
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
		.range([padding.left -1, width - padding.left -1])   // 这里主要解决坐标轴的偏差
}
// const quantize = d3.scale.quantize().domain([500,0]).range(['#888','#666','#444','#333','#000'])
// 返回将数据缩放Y坐标以适合图表的函数
const yScale = (props) => {
	let { data, YAxis, height, padding } = props
	return d3.scaleLinear()
		.domain([0, yMax(data, YAxis)])
		.range([height - padding.top - padding.bottom, padding.top])
}
class ScatterPlot extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// circleStyle: {
			// 	style: { display: 'none' }
			// },
			vLineStyle: {
				style: { display: 'none' }
			},
			hLineStyle: {
				style: { display: 'none' }
			}
		}
	}
	static defaultProps = {
		width: 600,
		height: 400,
		padding: { top: 32, bottom: 32, left: 20, right: 20 },
		// left: 40,
		tickSize: 5,
		tickFormat: '',
		stroke: '#673ab7',
		r: 3,
		color: 'red',
		fill: '#000',
		interactive: true, // 是否显示交互的效果
		// circleProps: {    //circle的style属性
		// 	r: 5,
		// 	fill: 'transparent',
		// 	stroke:'#666'
		// },
		tipLineProps: {   //两条虚线的公共样式
			stroke: '#666'
		}
	}
	renderData = () => {
		let { width, height, padding, data, XAxis, YAxis } = this.props
		let dWidth = width - padding.left - padding.right - data.length / 2,  // 这里要减去每个circle的半径
			dHeight = height - padding.top - padding.bottom

		let xDomain = d3.max(data, (d) => d[XAxis]),
			yDomain = d3.max(data, (d) => d[YAxis])
		let scaleX = d3.scaleLinear()
			.domain([0, xDomain])
			.range([0, dWidth])
		let scaleY = d3.scaleLinear()
			.domain([0, yDomain])
			.range([dHeight, padding.bottom])
		let scatterPlot = d3.select(this.scatterPlot)
		let rect = scatterPlot.selectAll('rect')

		let _this = this
		rect.on('mouseover', function () {
			let mouseX = d3.mouse(this)[0] - padding.left
			// 通过比例尺的反函数计算原数据中的值
			let x0 = scaleX.invert(mouseX)
			// x0取值应该在[0,xDomain]之间
			x0 = x0 < 0 ? 0 : x0 >= xDomain ? xDomain : Number(Math.round(x0))
			// 查找元素组中x0的值，并返回索引
			let bisect = d3.bisector((d) => d[XAxis]).left
			let index = bisect(data, x0)

			let x1 = data[index][XAxis], y1 = data[index][YAxis]
			_this.setState({
				content: `${XAxis}  ${x1} : ${YAxis}  ${y1}`,
				tooltipStyle: {
					left: d3.event.pageX,
					top: d3.event.clientY + 20,
					opacity: 0.9
				},
				// circleStyle: {
				// 	style: { display: 'none' }
				// },
				vLineStyle: {
					style: { display: 'none' }
				},
				hLineStyle: {
					style: { display: 'none' }
				}
			})
		}).on('mouseout', () => {
			this.setState({
				tooltipStyle: {
					opacity: 0
				},
				// circleStyle: {
				// 	style: { display: 'none' }
				// },
				vLineStyle: {
					style: { display: 'none' }
				},
				hLineStyle: {
					style: { display: 'none' }
				}
			})
		}).on('mousemove', function () {
			let mouseX = d3.mouse(this)[0] - padding.left
			// 通过比例尺的反函数计算原数据中的值
			let x0 = scaleX.invert(mouseX)
			// x0取值应该在[0,xDomain]之间
			x0 = x0 < 0 ? 0 : x0 >= xDomain ? xDomain : Number(Math.round(x0))
			// 查找元素组中x0的值，并返回索引
			let bisect = d3.bisector((d) => d[XAxis]).left
			let index = bisect(data, x0)

			let x1 = data[index][XAxis], y1 = data[index][YAxis]
			let focusX = scaleX(x1) + padding.left + 11, focusY = scaleY(y1) + padding.top

			_this.setState({
				content: `${XAxis}  ${x1} : ${YAxis}  ${y1}`,
				tooltipStyle: {
					left: d3.event.pageX,
					top: d3.event.clientY + 20,
					opacity: 0.9
				},
				// circleStyle: {
				// 	style: { display: 'block' },
				// 	transform: `translate(${focusX},${focusY})`
				// },
				vLineStyle: {
					style: { display: 'block' },
					x1: focusX,
					y1: padding.top,
					x2: focusX,
					y2: height - padding.bottom
				},
				hLineStyle: {
					x1: width,
					y1: focusY,
					x2: padding.left,
					y2: focusY
				}
			})
		})
	}
	componentDidMount() {
		this.renderData()
	}
	componentDidUpdate() {
		this.renderData()
	}
	render(props, { content, tooltipStyle, vLineStyle, hLineStyle }) {
		const scales = { xScale: xScale(props), yScale: yScale(props) }
		let { interactive, width, height, padding, data, XAxis, YAxis, tickSize = 5, tickFormat, stroke, tipLineProps } = props
		let dWidth = width - padding.left - padding.right - data.length / 2,  // 这里要减去每个circle的半径
			dHeight = height - padding.top - padding.bottom

		const rectProps = {
			width:width - padding.left,
			height: height - padding.top - padding.bottom,
			transform: `translate(${padding.left},${padding.top})`
		}
		return <div class={styles.container}>
			<Tooltip
				content={content}
				tooltipStyle={tooltipStyle}
			/>
			<svg ref={el => this.scatterPlot = el} width={width + padding.left + padding.right} height={height + padding.top + padding.bottom}>
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
				<Circles {...props} {...scales} />
				{interactive&&<rect class={styles.overlay} {...rectProps} />}
				{/*<g class="focusCircle" {...circleStyle}>
					<circle {...circleProps} />
				</g>*/}
				<g class="focusLine" >
					<line stroke-dasharray="3" {...tipLineProps} {...vLineStyle} />
					<line stroke-dasharray="3" {...tipLineProps} {...hLineStyle} />
				</g>
			</svg>
		</div>
	}
}
export default ScatterPlot
