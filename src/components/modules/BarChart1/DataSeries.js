import { h, Component } from 'preact'
import BarContainer from './BarContainer'


class DataSeries extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fill: this.props.fill
		}
	}
	static defaultProps = {
		interpolationType: 'linear'
	}
	_renderBarSeries() {
		let { _data } = this.props

		return _data.map((layer, seriesIdx) => {
			layer.map(d=>{
				let segment = d[1]-d[0]

				return this._renderBarContainer(segment, seriesIdx)
			})
			// return valuesAccessor(layer)
			// 	.map(segment => this._renderBarContainer(segment, seriesIdx))
		})
	}
	_renderBarContainer(segment, seriesIdx) {
		let { colors, colorAccessor, hoverAnimation, xScale, yScale } = this.props
		let barHeight = Math.abs(yScale(0) - yScale(segment))
		let y = yScale(segment.y0 + segment.y)
		return (
			<BarContainer
				height={barHeight}
				width={xScale}
				x={xScale(segment.x)}
				y={(segment.y >= 0) ? y : y - barHeight}
				fill={colors(colorAccessor(segment, seriesIdx))}
				hoverAnimation={hoverAnimation}
				onMouseOver={this.props.onMouseOver}
				onMouseLeave={this.props.onMouseLeave}
				dataPoint={{ xValue: segment.x, yValue: segment.y, seriesName: this.props.series[seriesIdx] }}
			/>
		)
	}
	render() {
		return (
			<g>{this._renderBarSeries()}</g>
		)
	}
}


export default DataSeries
