import { h, Component } from 'preact'
import * as d3 from 'd3'
import Legend from '../Legend'
class LegendChart extends Component {
	static defaultProps = {
		className: 'rd3-legend-chart',
		colors: d3.scaleOrdinal(d3.schemeCategory20),
		colorAccessor: (d, idx) => idx,
		data: [],
		legend: false,
		legendPosition: 'right',
		sideOffset: 100,     // legend的长度
		svgClassName: 'rd3-chart',
		titleClassName: 'rd3-chart-title'
	}
	_renderLegend =()=> {
		let props = this.props

		if (props.legend) {
			return (
				<Legend
					colors={props.colors}
					colorAccessor={props.colorAccessor}
					data={props.data}
					legendPosition={props.legendPosition}
					margins={props.margins}
					width={props.sideOffset}
				/>
			)
		}
	}
	_renderTitle = () => {
		let props = this.props

		if (props.title !== '' && props.title !== null) {
			return (
				<h4
					className={props.titleClassName}
				>
					{props.title}
				</h4>
			)
		}
		return null
	}
	_renderChart = () => {
		let props = this.props

		return (
			<svg
				className={props.svgClassName}
				height="100%"
				viewBox={props.viewBox}
				width="100%"
			>
				{props.children}
			</svg>
		)
	}
	render() {
		let props = this.props

		return (
			<div
				className={props.className}
				style={{ 'width': props.width, 'height': props.height }}
			>
				{this._renderTitle()}
				<div style={{ display: 'table', width: '100%', height: '100%' }}>
					<div style={{ display: 'table-cell' }}>
						{this._renderChart()}
					</div>
					<div style={{ display: 'table-cell', width: props.sideOffset, 'verticalAlign': 'top' }}>
						{this._renderLegend()}
					</div>
				</div>
			</div>
		)
	}
}
export default LegendChart
