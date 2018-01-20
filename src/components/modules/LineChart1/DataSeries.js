import { h, Component } from 'preact'
import * as d3 from 'd3'
import VoronoiCircleContainer from './VoronoiCircleContainer'
import Line from './Line'

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
	render({ value, width, height, data, xScale, yScale, xAccessor, yAccessor, colors, colorAccessor,hoverAnimation,circleRadius,onMouseOver }) {
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
		let lines = data.map((series, idx) => {
			return (
				<Line
					path={interpolatePath(series.values)}
					stroke={colors(colorAccessor(series, idx))}
					strokeWidth={series.strokeWidth}
					strokeDashArray={series.strokeDashArray}
					seriesName={series.name}
					key={idx}
				/>
			)
		})
		let voronoi = d3.voronoi()
			.x(d => xScale(d.coord.x))
			.y(d => yScale(d.coord.y))
			.extent([[0, 0], [width, height]])
		let cx, cy, circleFill
		let regions = voronoi(value).cells.map((vnode, idx) => {
			let point = vnode.site.data.coord
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
			circleFill = colors(colorAccessor(vnode, vnode.site.data.seriesIndex))
			console.log('circleFill',circleFill)
			return (
				<VoronoiCircleContainer
					key={idx}
					circleFill={circleFill}
					vnode={vnode}
					hoverAnimation={hoverAnimation}
					cx={cx} cy={cy}
					circleRadius={circleRadius}
					onMouseOver={onMouseOver}
					dataPoint={{ xValue: xAccessor(point), yValue: yAccessor(point), seriesName: vnode.site.data.series.name }}
				/>
			)
		})
		return (
			<g>
				<g>{regions}</g>
				<g>{lines}</g>
			</g>
		)
	}
}

export default DataSeries
