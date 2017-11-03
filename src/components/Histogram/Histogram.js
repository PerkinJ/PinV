import { h, Component } from 'preact'
import d3 from 'd3'
import Axis from '../Axis'
import styles from './index.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)
const padding = 20
class Histogram extends Component {
	static defaultProps = {
		width: 1000,
		height: 400,
		padding: {top:32,bottom:32,left:40,right:20},
		// left: 40,
		tickSize: 5,
		tickFormat: '',
		delta: 1,
	}
	render({ data, padding, width, height, XAxis,YAxis,tickSize, tickFormat, delta }) {
		let dWidth = width - padding.left-padding.right,
			dHeight = height - padding.top - padding.bottom
		let xDomain = d3.max(data, function (d) { return d[XAxis] }),
			yDomain = d3.max(data,function(d){ return d[YAxis]})
		let scaleX = d3.scale.linear()
			.domain([0, xDomain])
			.range([0, dWidth])
		let scaleY = d3.scale.linear()
			.domain([0, yDomain])
			.range([dHeight, 0])
		let axisx = cx('axis', 'x'),
			axisy = cx('axis', 'y')
		let color = d3.scale.category10()
		return (
			<svg width={width+100} height={height}>
				<Axis
					type="x"
					dataKey={XAxis}
					data={data}
					length={dWidth}
					stroke="#673ab7"
					orient="bottom"
					class={axisx}
					textAnchor="middle"
					transform={"translate(" + padding.left + "," + (dHeight + padding.top) + ")"} />
				<Axis
					type='y'
					dataKey={YAxis}
					length={dHeight}
					data={data}
					stroke="#673ab7"
					orient="left"
					class={axisy}
					tickSize={tickSize}
					tickFormat={tickFormat}
					textAnchor="end"
					transform={"translate(" + padding.left + "," + padding.top + ")"} />
				<g class={styles.graph}>
					{data.map(d => {
						return (<rect
							width={dWidth / data.length}
							height={dHeight - scaleY(d.value)}
							transform={"translate(" + (scaleX(d.key) + padding.left +10) + "," + (scaleY(d.value) + padding.top ) + ")"}
							fill={color(d.value)}>
						</rect>
						)
					})}
				</g>
			</svg>
		)
	}
}
export default Histogram
