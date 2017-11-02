import { h, Component } from 'preact'
import d3 from 'd3'
import Axis from '../Axis'
import styles from './index.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class Histogram extends Component {
	static defaultProps = {
		width: 1000,
		height: 300,
		margin: {top:32,bottom:32,left:40,right:20},
		// left: 40,
		tickSize: 3,
		tickFormat: '.0s',
		delta: 1
	}
	render({ data, margin, width, height, tickSize, tickFormat, delta }) {
		const dWidth = width - margin.left-margin.right
		const dHeight = height - margin.top - margin.bottom
		const scaleX = d3.scale.linear()
			.domain([0, 120])
			.range([0, dWidth])
		const scaleY = d3.scale.linear()
			.domain([0, 2000])
			.range([dHeight, 0])
		let axisx = cx('axis', 'x'),
			axisy = cx('axis', 'y')
		let color = d3.scale.category10()

		return (
			<svg width={width} height={height}>
				<Axis
					type="x"
					dataKey="key"
					data={data}
					length={dWidth}
					stroke="#673ab7"
					orient="bottom"
					class={axisx}
					textAnchor="middle"
					unit={'ms'}
					margin={margin}
					transform={"translate(" + margin.left + "," + (dHeight + margin.top) + ")"} />
				<Axis
					type='y'
					dataKey="value"
					length={dHeight}
					data={data}
					stroke="#673ab7"
					orient="left"
					class={axisy}
					tickSize={tickSize}
					tickFormat={tickFormat}
					textAnchor="end"
					transform={"translate(" + margin.left + "," + margin.top + ")"} />
				<g class={styles.graph}>
					{data.map(d => {
						return (<rect
							width={dWidth / data.length - delta}
							height={dHeight - scaleY(d.value)}
							transform={"translate(" + (scaleX(d.key) + margin.left) + "," + (scaleY(d.value) + margin.top) + ")"}
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
