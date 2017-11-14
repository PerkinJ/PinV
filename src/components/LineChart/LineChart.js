import { h, Component } from 'preact'
import * as d3 from 'd3'
import Axis from '../Axis'
import styles from './index.less'
import DataCircles from '../ScatterPlot/data-circles'
import Tooltip from '../Tooltip'
class LineChart extends Component {
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
		color: 'rgb(255,0,0)'
	}
	componentDidMount() {
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
		let focusCircle = lineChart.append('g')
			.attr('class', 'focusCircle')
			.style('display', 'none')
		focusCircle.append('circle')
			.attr('r', 5)
			.attr('fill', '#666')

		let focusLine = lineChart.append('g')
			.attr('class', 'focusLine')
			.style('display', 'none')
		let vLine = focusLine.append('line'),
			hLine = focusLine.append('line')
		let _this = this
		rect.on('mouseover', () => {
			focusCircle.style('display', 'none')
			focusLine.style('display', null)
			vLine.style('display', 'none')
			hLine.style('display', 'none')

		}).on('mouseout', () => {
			focusCircle.style('display', 'none')
			focusLine.style('display', null)
			vLine.style('display', 'none')
			hLine.style('display', 'none')

		}).on('mousemove', function () {
			_this.setState({
				content: `test`,
				tooltipStyle: {
					left: d3.event.pageX,
					top: d3.event.pageY,
					opacity: 0.9
				}
			})
			let mouseX = d3.mouse(this)[0] - padding.left
			let x0 = scaleX.invert(mouseX)
			// x0取值应该在[0,xDomain]之间
			x0 = x0 < 0 ? 0 : x0 >= xDomain ? xDomain : Number(Math.round(x0))
			let bisect = d3.bisector((d) => d[XAxis]).left
			let index = bisect(data, x0)

			let x1 = data[index][XAxis], y1 = data[index][YAxis]
			let focusX = scaleX(x1) + padding.left + 10, focusY = scaleY(y1) + padding.top
			focusCircle.style('display', 'block').attr('transform', `translate(${focusX},${focusY})`)

			vLine.style('display', 'block')
				.attr('x1', focusX)
				.attr('y1', focusY)
				.attr('x2', focusX)
				.attr('y2', height - padding.bottom)
				.attr('stroke', '#666')
				.attr('stroke-dasharray', 3)
			hLine.style('display', 'block')
				.attr('x1', focusX)
				.attr('y1', focusY)
				.attr('x2', padding.left)
				.attr('y2', focusY)
				.attr('stroke', '#666')
				.attr('stroke-dasharray', 3)
		})
	}

	render(props, { content, tooltipStyle }) {
		let { width, height, padding, data, XAxis, YAxis, tickSize = 5, tickFormat, stroke, shape } = props
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
			width,
			height: height - padding.top - padding.bottom,
			transform: `translate(${padding.left - 20},${padding.top})`  // 这里-20主要解决x轴单位偏移的问题
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
				<rect id="rect" class={styles.overlay} {...rectProps} />

				<g transform={`translate(${padding.left - props.r},0)`} >
					<DataCircles
						xScale={scaleX}
						yScale={scaleY}
						{...props}
						fill='#fff'
					/>
				</g>
			</svg>
		</div>
	}
}
export default LineChart
