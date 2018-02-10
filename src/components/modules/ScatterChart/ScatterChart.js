import { h, Component } from 'preact'
import { Chart, XAxis, YAxis, Tooltip } from '../../common'
import DataSeries from './DataSeries'
import * as d3 from 'd3'
import { calculateScales,flattenData } from '../../../utils/utils'

class LineChart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			},
			changeState: false
		}
	}
	static defaultProps = {
		circleRadius: 3,
		className: 'rd3-linechart',
		hoverAnimation: true,
		margins: { top: 10, right: 20, bottom: 50, left: 45 },
		xAxisClassName: 'rd3-linechart-xaxis',
		yAxisClassName: 'rd3-linechart-yaxis',
		// default asccessor
		xAccessor: (d) => d.x,
		yAccessor: (d) => d.y,
		// default cartesian
		axesColor: '#673ab7',
		tickTextStroke:'#673ab7',
		tickStroke:'#673ab7',
		textColor:'#673ab7',
		colors: d3.scaleOrdinal(d3.schemeCategory20),
		colorAccessor: (d, idx) => idx,
		height: 200,
		horizontal: false,
		legend: false,
		legendOffset: 120,
		title: '',
		width: 400,
		xAxisLabel: '',
		xAxisLabelOffset: 38,
		xAxisOffset: 0,
		xOrient: 'bottom',
		yAxisLabel: '',
		yAxisLabelOffset: 35,
		yAxisOffset: 0,
		yOrient: 'default',
		// default tooltip
		showTooltip: true,
		tooltipFormat: (d,x,y) => `${x}:${String(d.xValue)},${y}:${String(d.yValue)}`,
		circleRadiusMultiplier: 1.5,
		shadeMultiplier: 0.2

	}
	componentWillReceiveProps() {
		this.setState({
			changeState: false
		})
	}
	// tooltip mouseover
	onMouseOver = (x, y, dataPoint) =>{
		if (!this.props.showTooltip)
			return
		this.setState({
			tooltip: {
				x,
				y,
				child: this.props.tooltipFormat.call(this, dataPoint,this.props.xAxisLabel?this.props.xAxisLabel:'x',this.props.yAxisLabel?this.props.yAxisLabel:'y'),
				show: true
			},
			changeState: true
		})
	}
	onMouseLeave = () => {
		if (!this.props.showTooltip)
			return
		this.setState({
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			},
			changeState: true
		})
	}
	_calculateScales(...props) {
		return calculateScales(...props)
	}
	// certetisian
	getYOrient = () =>{
		let yOrient = this.props.yOrient

		if (yOrient === 'default') {
			return this.props.horizontal ? 'right' : 'left'
		}

		return yOrient
	}
	getViewBox = () =>{
		if (this.props.viewBoxObject) {
			let v = this.props.viewBoxObject
			return [v.x, v.y, v.width, v.height].join(' ')
		} else if (this.props.viewBox) {
			return this.props.viewBox
		}
	}
	getDimensions = () =>{
		let props = this.props
		let { horizontal, margins, viewBoxObject, xOrient, xAxisOffset, yAxisOffset } = props
		let yOrient = this.getYOrient()

		let width, height
		if (viewBoxObject) {
			width = viewBoxObject.width,
			height = viewBoxObject.height
		} else {
			width = props.width,
			height = props.height
		}

		let svgWidth, svgHeight
		let xOffset, yOffset
		let svgMargins
		let trans
		if (horizontal) {
			let center = width / 2
			trans = `rotate(90 ${center} ${center}) `
			svgWidth = height
			svgHeight = width
			svgMargins = {
				left: margins.top,
				top: margins.right,
				right: margins.bottom,
				bottom: margins.left
			}
		} else {
			trans = ''
			svgWidth = width
			svgHeight = height
			svgMargins = margins
		}

		xAxisOffset = Math.abs(props.xAxisOffset || 0)
		yAxisOffset = Math.abs(props.yAxisOffset || 0)

		xOffset = svgMargins.left + (yOrient === 'left' ? yAxisOffset : 0)
		yOffset = svgMargins.top + (xOrient === 'top' ? xAxisOffset : 0)
		trans += `translate(${xOffset}, ${yOffset})`

		return {
			innerHeight: svgHeight - svgMargins.top - svgMargins.bottom - xAxisOffset,
			innerWidth: svgWidth - svgMargins.left - svgMargins.right - yAxisOffset,
			trans,
			svgMargins
		}
	}
	render() {
		let props = this.props
		if (this.props.data && this.props.data.length < 1) {
			return null
		}

		let { innerWidth, innerHeight, trans, svgMargins } = this.getDimensions()
		let yOrient = this.getYOrient()
		let domain = props.domain || {}

		if (!Array.isArray(props.data)) {
			props.data = [props.data]
		}

		// Returns an object of flattened allValues, xValues, and yValues
		let flattenedData = flattenData(props.data, props.xAccessor, props.yAccessor)

		let allValues = flattenedData.allValues,
			xValues = flattenedData.xValues,
			yValues = flattenedData.yValues
		let scales = this._calculateScales(innerWidth, innerHeight, xValues, yValues, domain.x, domain.y)
		return (
			<span onMouseLeave={this.onMouseLeave}>
				<Chart
					viewBox={this.getViewBox()}
					legend={props.legend}
					sideOffset={props.sideOffset}
					legendPosition={props.legendPosition}
					data={props.data}
					margins={props.margins}
					colors={props.colors}
					colorAccessor={props.colorAccessor}
					width={props.width}
					height={props.height}
					title={props.title}
					shouldUpdate={!this.state.changeState}
				>
					<g transform={trans} className={props.className}>
						<XAxis
							xAxisClassName={props.xAxisClassName}
							strokeWidth={props.xAxisStrokeWidth}
							xAxisTickValues={props.xAxisTickValues}
							xAxisTickInterval={props.xAxisTickInterval}
							xAxisOffset={props.xAxisOffset}
							xScale={scales.xScale}
							xAxisLabel={props.xAxisLabel}
							xAxisLabelOffset={props.xAxisLabelOffset}
							tickFormatting={props.xAxisFormatter}
							xOrient={props.xOrient}
							yOrient={yOrient}
							data={props.data}
							margins={svgMargins}
							width={innerWidth}
							height={innerHeight}
							horizontalChart={props.horizontal}
							stroke={props.axesColor}
							tickStroke={props.tickStroke}
							tickTextStroke={props.tickTextStroke}
							textColor={props.textColor}
							gridVertical={props.gridVertical}
							gridVerticalStroke={props.gridVerticalStroke}
							gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
							gridVerticalStrokeDash={props.gridVerticalStrokeDash}
						/>
						<YAxis
							yAxisClassName={props.yAxisClassName}
							strokeWidth={props.yAxisStrokeWidth}
							yScale={scales.yScale}
							yAxisTickValues={props.yAxisTickValues}
							yAxisTickCount={props.yAxisTickCount}
							yAxisOffset={props.yAxisOffset}
							yAxisLabel={props.yAxisLabel}
							yAxisLabelOffset={props.yAxisLabelOffset}
							tickFormatting={props.yAxisFormatter}
							xOrient={props.xOrient}
							yOrient={yOrient}
							margins={svgMargins}
							width={innerWidth}
							height={innerHeight}
							horizontalChart={props.horizontal}
							stroke={props.axesColor}
							tickStroke={props.tickStroke}
							textColor={props.textColor}
							tickTextStroke={props.tickTextStroke}
							gridHorizontal={props.gridHorizontal}
							gridHorizontalStroke={props.gridHorizontalStroke}
							gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
							gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
						/>
						<DataSeries
							xScale={scales.xScale}
							yScale={scales.yScale}
							xAccessor={props.xAccessor}
							yAccessor={props.yAccessor}
							hoverAnimation={props.hoverAnimation}
							circleRadius={props.circleRadius}
							data={props.data}
							value={allValues}
							interpolationType={props.interpolationType}
							colors={props.colors}
							colorAccessor={props.colorAccessor}
							width={innerWidth}
							height={innerHeight}
							onMouseOver={this.onMouseOver}
							onMouseLeave={this.onMouseLeave}
						/>
					</g>
				</Chart>
				{(props.showTooltip ? <Tooltip {...this.state.tooltip} /> : null)}
			</span>
		)
	}
}
export default LineChart
