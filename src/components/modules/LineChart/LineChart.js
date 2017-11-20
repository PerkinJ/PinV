import { h, Component } from 'preact'
import * as d3 from 'd3'
import Axis from '../../basic/Axis'
import styles from './index.less'
import Circles from '../../basic/Circles'
import Tooltip from '../../basic/Tooltip'
class LineChart extends Component {
	constructor(props){
		super(props)
		this.state = {
			circleStyle:{
				style:{display:'none'}
			},
			vLineStyle:{
				style:{display:'none'}
			},
			hLineStyle:{
				style:{display:'none'}
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
		shape: 'curveCardinal',
		r: 3,
		interactive:true, // 是否显示交互的效果
		color: 'rgb(255,0,0)',
		circleProps:{    //circle的style属性
			r:5,
			fill:'#666'
		},
		tipLineProps:{   //两条虚线的公共样式
			stroke:'#666'
		},
		circleStroke:null
	}
	componentDidMount() {
		this.renderData()
	}
	componentDidUpdate(){
		this.renderData()
	}
	// 主要处理不同数据下，focusLine以及focusCircle的位置以及样式
	renderData = ()=>{
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
		let lineChart = d3.select(this.lineChart)
		let rect = lineChart.selectAll('rect')

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
					left: d3.mouse(this)[0],
					top: d3.mouse(this)[1],
					opacity: 0.9
				},
				circleStyle:{
					style:{display:'none'}
				},
				vLineStyle:{
					style:{display:'none'}
				},
				hLineStyle:{
					style:{display:'none'}
				}
			})
		}).on('mouseout', () => {
			this.setState({
				tooltipStyle: {
					opacity: 0
				},
				circleStyle:{
					style:{display:'none'}
				},
				vLineStyle:{
					style:{display:'none'}
				},
				hLineStyle:{
					style:{display:'none'}
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
					top: d3.mouse(this)[1],
					opacity: 0.9
				},
				circleStyle:{
					style:{display:'block'},
					transform:`translate(${focusX},${focusY})`
				},
				vLineStyle:{
					style:{display:'block'},
					x1:focusX,
					y1:focusY,
					x2:focusX,
					y2:height - padding.bottom
				},
				hLineStyle:{
					x1:focusX,
					y1:focusY,
					x2:padding.left,
					y2:focusY
				}
			})
		})
	}
	render(props, { content, tooltipStyle,circleStyle,vLineStyle,hLineStyle }) {
		let { interactive,width, height, padding, data, XAxis, YAxis, tickSize = 5, tickFormat, stroke, shape,circleProps,tipLineProps,circleStroke } = props
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
		let linePath = d3.line()
			.x((d) => scaleX(d[XAxis]))
			.y((d) => scaleY(d[YAxis]))
			.curve(d3[shape])
		const lineProps = {
			stroke,
			fill: 'none',
			d: linePath(data),
			transform: `translate(${padding.left + 10},${padding.top})`
		}
		const rectProps = {
			width:width - padding.left,
			height: height - padding.top - padding.bottom,
			transform: `translate(${padding.left},${padding.top})`
		}
		// v4与v3的区别 v3的interpolate不再使用  https://github.com/d3/d3-shape/blob/master/README.md#curves
		return <div class={styles.container}>
			<Tooltip
				content={content}
				tooltipStyle={tooltipStyle}
			/>
			<svg ref={el => this.lineChart = el} width={width + padding.left + padding.right} height={height + padding.top + padding.bottom}>
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
				<path class={styles.line} {...lineProps} />
				<g transform={`translate(${padding.left - props.r},0)`} >
					<Circles
						xScale={scaleX}
						yScale={scaleY}
						{...props}
						fill='#fff'
						circleStroke={circleStroke}
					/>
				</g>
				{interactive&&<rect class={styles.overlay} {...rectProps} />}
				<g class="focusCircle" {...circleStyle}>
					<circle {...circleProps}/>
				</g>
				<g class="focusLine" >
					<line stroke-dasharray="3" {...tipLineProps} {...vLineStyle}/>
					<line stroke-dasharray="3" {...tipLineProps} {...hLineStyle}/>
				</g>
			</svg>
		</div>
	}
}
export default LineChart
