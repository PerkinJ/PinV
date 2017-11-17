import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'
import { colorGenerator } from 'utils/utils'
import { getPieData } from 'utils/model'
import Tooltip from '../../basic/Tooltip'

const calculateArc = (value, arcProps) => (
	d3.arc()
		.cornerRadius(arcProps.cornerRadius)
		.innerRadius(arcProps.innerRadius)
		.outerRadius(arcProps.outerRadius)
		.startAngle(value.startAngle)
		.endAngle(value.endAngle)
		.padAngle(arcProps.padAngle)
)

class PieChart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tooltip: '',
			left: 0,
			top: 0
		}
	}
	renderTooltip = () => {
		const { height, data, dataKey, nameKey, startAngle, endAngle, unit = '' } = this.props
		const pieData = getPieData(data, dataKey, startAngle, endAngle)

		let pieChart = d3.select(this.pieChart)
		let arcs = pieChart.selectAll('g').data(pieData)
		let _this = this
		let mouseTop = height / 2 + 10
		arcs.on('mouseover', function (d) {
			_this.setState({
				tooltip: `${d.data[nameKey]}:${d.data[dataKey]}${unit}`,
				tooltipStyle: {
					left: d3.event.pageX,
					top: d3.mouse(this)[1] + mouseTop,
					opacity: 0.9
				}
			})
		}).on('mousemove', function () {
			_this.setState({
				tooltipStyle: {
					left: d3.event.pageX,
					top: d3.mouse(this)[1] + mouseTop,
					opacity: 0.9
				}
			})
		}).on('mouseout', () => {
			this.setState({
				tooltipStyle: {
					opacity: 0
				}
			})
		})
	}
	componentDidUpdate() {
		this.renderTooltip()
	}
	componentDidMount() {
		this.renderTooltip()
	}
	render({ width = 500, height = 500, startAngle = 0, endAngle = 1, cx, cy, innerRadius, outerRadius, cornerRadius, padAngle, textColor, data, dataKey, nameKey }, { tooltip, tooltipStyle }) {
		const pieData = getPieData(data, dataKey, startAngle, endAngle)
		let arcProps = {
			innerRadius: innerRadius && innerRadius < outerRadius ? innerRadius : 0,
			outerRadius: outerRadius || width / 3,
			textColor: textColor || '#000',
			cx: cx || width / 2,
			cy: cy || height / 2,
			cornerRadius: cornerRadius || 0,
			padAngle: padAngle || 0
		}
		return (
			<div class={styles.container}>
				<Tooltip tooltipStyle={tooltipStyle} content={tooltip} />
				<svg ref={el => this.pieChart = el} width={width} height={height} class={styles.chart}>
					{pieData.map((value, index, arr) =>
						<Segment
							{...arcProps}
							index={index}
							arc={calculateArc(value, arcProps)}
							label={data}
							length={arr.length}
							nameKey={nameKey}
							dataKey={dataKey}
						/>
					)}
				</svg>
			</div>
		)
	}
}

const Segment = ({ cx, cy, arc, index, label, innerRadius, outerRadius, textColor, length, nameKey, dataKey }) => {
	const colors = colorGenerator(length)
	let percent = Number(label[index][dataKey]) / d3.sum(label, (d) => d[dataKey]) * 100
	let text = label[index][nameKey]
	return (
		<g class={styles.segment} transform={`translate(${cx}, ${cy})`}>
			<path class={styles.path} d={arc()} fill={colors(index).toString()} />
			<Label textColor={textColor} arc={arc.innerRadius(innerRadius).outerRadius(outerRadius)}>{`${percent.toFixed(2)}%`}</Label>
			<line
				stroke="black"
				x1={arc.centroid()[0] * 2}
				y1={arc.centroid()[1] * 2}
				x2={arc.centroid()[0] * 2.2}
				y2={arc.centroid()[1] * 2.2}
			/>
			<text
				fill={textColor}
				transform={`translate(${arc.centroid()[0] * 2.5},${arc.centroid()[1] * 2.5})`}
				text-anchor="middle">
				{text}
			</text>
		</g>
	)
}

const Label = ({ children, arc, textColor }) =>
	<text fill={textColor} transform={`translate(${arc.centroid()})`} text-anchor="middle">{children}</text>

export default PieChart
