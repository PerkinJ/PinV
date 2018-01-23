import { h, Component } from 'preact'
import * as d3 from 'd3'
import VoronoiCircleContainer from './VoronoiCircleContainer'

class DataSeries extends Component {
	static defaultProps = {
		data: [],
		xAccessor: (d) => d.x,
		yAccessor: (d) => d.y,
		interpolationType: 'linear',
		hoverAnimation: false
	}
	_isDate(d, accessor) {
		return Object.prototype.toString.call(accessor(d)) === '[object Date]'
	}
	render({ value, width, height, data, xScale, yScale, xAccessor, yAccessor, colors, colorAccessor,hoverAnimation,circleRadius,onMouseOver,onMouseLeave }) {
		let interpolatePath = d3.line()
			.y((d) => yScale(yAccessor(d)))
			// .interpolate(interpolationType)

		if (this._isDate(data[0].values[0], xAccessor)) {
			interpolatePath.x(d =>
				xScale(xAccessor(d).getTime())
			)
		} else {
			interpolatePath.x((d) =>
				xScale(xAccessor(d))
			)
		}

		let voronoi = d3.voronoi()
			.x(d => xScale(d.coord.x))
			.y(d => yScale(d.coord.y))
			.extent([[0, 0], [width, height]])
		let cx, cy, circleFill
		// 为每个circle添加一个多边形交互区域，即VoronoiCircle
		let regions = voronoi(value).polygons().map((vnode, idx) => {
			let point = vnode.data.coord
			if (Object.prototype.toString.call(xAccessor(point)) === '[object Date]') {
				cx = xScale(xAccessor(point).getTime())
			} else {
				cx = xScale(xAccessor(point))
			}
			if (Object.prototype.toString.call(yAccessor(point)) === '[object Date]') {
				cy = yScale(yAccessor(point).getTime())
			} else {
				cy = yScale(yAccessor(point))
			}
			circleFill = colors(colorAccessor(vnode, vnode.data.seriesIndex))

			return (
				<VoronoiCircleContainer
					key={idx}
					circleFill={circleFill}
					vnode={vnode}
					hoverAnimation={hoverAnimation}
					cx={cx} cy={cy}
					circleRadius={circleRadius}
					onMouseOver={onMouseOver}
					onMouseLeave={onMouseLeave}
					dataPoint={{ xValue: xAccessor(point), yValue: yAccessor(point), seriesName: vnode.data.series.name }}
				/>
			)
		})
		return (
			<g>
				<g>{regions}</g>
			</g>
		)
	}
}

export default DataSeries
