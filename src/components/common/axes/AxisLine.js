import { h, Component } from 'preact'

class AxisLine extends Component {
	static defaultProps = {
		innerTickSize: 6,
		outerTickSize: 6,
		tickPadding: 3,
		fill: 'none',
		tickArguments: [10],
		tickValues: null,
		tickFormat: null
	}
	_d3_scaleExtent(domain) {
		let start = domain[0], stop = domain[domain.length - 1]
		return start < stop ? [start, stop] : [stop, start]
	}

	_d3_scaleRange(scale) {
		return scale.rangeExtent ? scale.rangeExtent() : this._d3_scaleExtent(scale.range())
	}
	render({ orient, scale, outerTickSize, fill, stroke, strokeWidth }) {
		let sign = orient === "top" || orient === "left" ? -1 : 1

		let range = this._d3_scaleRange(scale)

		let d

		if (orient === "bottom" || orient === "top") {
			d = "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize
		} else {
			d = "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize
		}

		return (
			<path
				className="domain"
				d={d}
				style={{ 'shapeRendering': 'crispEdges' }}
				fill={fill}
				stroke={stroke}
				strokeWidth={strokeWidth}
			/>

		)
	}
}
export default AxisLine
