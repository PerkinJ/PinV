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
		legendPosition: 'top',
		sideOffset: 100,     // legend的长度
		svgClassName: 'rd3-chart',
		titleClassName: 'rd3-chart-title'
	}
	_renderLegend = () => {
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
				width={props.width}
			>
				{props.children}
			</svg>
		)
	}
	render() {
		let props = this.props
		let {legendPosition} = props
		return (
			<div
				className={props.className}
			>
				{this._renderTitle()}
				{legendPosition === 'top' && <div>
					{this._renderLegend()}
					{this._renderChart()}
				</div>}
				{legendPosition === 'bottom' && <div>
					{this._renderChart()}
					{this._renderLegend()}
				</div>}
				{legendPosition === 'right' && <div style={{ display: 'flex' }}>
					{this._renderChart()}
					<div style={{ width: props.sideOffset }}>
						{this._renderLegend()}
					</div>
				</div>}
				{legendPosition === 'left' && <div style={{ display: 'flex' }}>
					<div style={{ width: props.sideOffset }}>
						{this._renderLegend()}
					</div>
					{this._renderChart()}
				</div>}
			</div>
		)
	}
}
export default LegendChart
