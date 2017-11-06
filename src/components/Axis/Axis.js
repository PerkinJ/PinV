import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'


class Axis extends Component {
	// 计算x轴的长度
	getScaleX = (length, domain = "") => {
		if (domain) {
			return d3.scale.linear()
				.domain(domain)
				.range([0, length])
		} else {
			let { data, dataKey } = this.props
			if (!data) console.error("you didn't add data")
			if (!dataKey) console.error("you didn't add dataKey")
			let xDomian = d3.max(data, function (d) { return d[dataKey] })
			return d3.scaleLinear()
				.domain([0, xDomian])
				.range([0, length])
		}

	}
	// 计算y轴的长度
	getScaleY = (length, domain = "") => {
		if (domain) {
			return d3.scale.linear()
				.domain(domain)
				.range([length, 0])
		} else {
			let { data, dataKey } = this.props
			if (!data) console.error("you didn't add data")
			if (!dataKey) console.error("you didn't add dataKey")
			let yDomain = 1.2 * d3.max(data, function (d) { return d[dataKey] })
			return d3.scaleLinear()
				.domain([yDomain, 0])
				.range([0, length])
		}
	}
	render({ data,orient = 'bottom', tickSize = null, textAnchor, unit, tickFormat = '', type = 'x', length, domain, hide = false, ...props }) {
		let scale = type === 'x' ? this.getScaleX(length, domain) : this.getScaleY(length, domain)
		let ticks = type === 'x' ?scale.ticks(data.length):scale.ticks(tickSize)
		let delta = Number(length/ticks.length)
		let path = orient === "bottom" ? `M0.5,6V0.5H${length+1.5*delta}V6` : `M-6,${length}H0.5V0.5H-6`
		return (
			<g {...props} fill="none">
				<path class={hide ? styles.hidden : styles.show} stroke={props.stroke} d={path} />
				{ticks.map(d => {
					let space = scale(d)
					if (orient === "bottom") {
						return (
							<g class={styles.tick} opacity="1" transform={`translate( ${space+delta/2},0)`}>
								<line stroke="#000" y2="6" />
								<text text-anchor={textAnchor} fill="#000" y="9" dy="0.71em">{d}{unit}</text>
							</g>
						)
					} else {
						return (
							<g class={styles.tick} opacity="1" transform={`translate(0,${space} )`}>
								<line stroke="#000" x2="-6" />
								<text text-anchor={textAnchor} fill="#000" x="-9" dy="0.32em">{d3.format(tickFormat)(d)}{unit}</text>
							</g>
						)
					}
				})}
			</g>
		)
	}
}
export default Axis
