import { h, Component } from 'preact'
import { Chart, XAxis, YAxis, Tooltip } from '../../common'
import * as d3 from 'd3'
// import DataSeries from './DataSeries'

class BarChart extends Component {
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
		axesColor: '#000',
		colors: d3.scaleOrdinal(d3.schemeCategory20),
		colorAccessor: (d, idx) => idx,
		height: 200,
		horizontal: false,
		legend: false,
		legendOffset: 120,
		title: '',
		width: 400,
		// xAxisFormatter: no predefined value right now
		xAxisLabel: '',
		xAxisLabelOffset: 38,
		xAxisOffset: 0,
		// xAxisTickCount: no predefined value right now
		// xAxisTickInterval: no predefined value right now
		// xAxisTickValues: no predefined value right now
		xOrient: 'bottom',
		// yAxisFormatter: no predefined value right now
		yAxisLabel: '',
		yAxisLabelOffset: 35,
		yAxisOffset: 0,
		// yAxisTickCount: no predefined value right now
		// yAxisTickInterval: no predefined value right now
		// yAxisTickValues: no predefined value right now
		yOrient: 'default',
		xAccessor: (d) => d.x,
		yAccessor: (d) => d.y,
		showTooltip: true,
		tooltipFormat: (d) => String(d.yValue),
		chartClassName: 'rd3-barchart',
		hoverAnimation: true,
		margins: { top: 10, right: 20, bottom: 40, left: 45 },
		rangeRoundBandsPadding: 0.25,
		stackOffset: 'zero',
		valuesAccessor: d => d.values,
		xAxisClassName: 'rd3-barchart-xaxis',
		yAxisClassName: 'rd3-barchart-yaxis',
		yAxisTickCount: 4
	}
	componentWillReceiveProps() {
		this.setState({
			changeState: false
		})
	}
	getViewBox() {
		if (this.props.viewBoxObject) {
			let v = this.props.viewBoxObject
			return [v.x, v.y, v.width, v.height].join(' ')
		} else if (this.props.viewBox) {
			return this.props.viewBox
		}
	}
	getDimensions() {
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
	onMouseOver(x, y, dataPoint) {
		if (!this.props.showTooltip)
			return
		this.setState({
			tooltip: {
				x,
				y,
				child: this.props.tooltipFormat.call(this, dataPoint),
				show: true
			},
			changeState: true
		})
	}
	onMouseLeave() {
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
	getYOrient() {
		let yOrient = this.props.yOrient

		if (yOrient === 'default') {
			return this.props.horizontal ? 'right' : 'left'
		}

		return yOrient
	}
	_getStackedValuesMaxY(_data) {
		let max = 0
		d3.max(_data,d=>{
			d3.max(d,(val)=>{
				max = val > max ?val:max
			})
		})
		return max
	}
	_getStackedValuesMinY(_data) {
		let min = 0
		d3.min(_data,d=>{
			d3.min(d,(val)=>{
				min = val < min ?val:min
			})
		})
		return min
	}
	_getLabels(series) {
		let data = []
		series.forEach(d=>{
			data.push(d.key)
		})
		return data
	}
	_stack() {
		// Only support columns with all positive or all negative values
		// https://github.com/mbostock/d3/issues/2265
		// let { stackOffset, xAccessor, yAccessor, valuesAccessor } = this.props
		return d3.stack()
			.keys(["apples", "bananas", "cherries", "dates"])
			.order(d3.stackOrderNone)
			.offset(d3.stackOffsetNone)
	}
	render() {

		let props = this.props
		let yOrient = this.getYOrient()

		let _data = this._stack()(props.data)
		let { innerHeight, innerWidth, trans, svgMargins } = this.getDimensions()
		let xScale = d3.scaleOrdinal()
			.domain(this._getLabels(_data))
			.range([0, innerWidth], props.rangeRoundBandsPadding)
		let yScale = d3.scaleLinear()
			.range([innerHeight, 0])
			.domain([Math.min(0, this._getStackedValuesMinY(_data[0])), this._getStackedValuesMaxY(_data[_data.length - 1])])

		// let series = props.data.map((item) => item.name)

		return (
			<span>
				<Chart
					viewBox={this.getViewBox()}
					legend={props.legend}
					data={props.data}
					margins={props.margins}
					colors={props.colors}
					colorAccessor={props.colorAccessor}
					width={props.width}
					height={props.height}
					title={props.title}
					shouldUpdate={!this.state.changeState}
				>
					<g transform={trans} className={props.chartClassName}>
						<YAxis
							yAxisClassName={props.yAxisClassName}
							yAxisTickValues={props.yAxisTickValues}
							yAxisLabel={props.yAxisLabel}
							yAxisLabelOffset={props.yAxisLabelOffset}
							yScale={yScale}
							margins={svgMargins}
							yAxisTickCount={props.yAxisTickCount}
							tickFormatting={props.yAxisFormatter}
							width={innerWidth}
							height={innerHeight}
							horizontalChart={props.horizontal}
							xOrient={props.xOrient}
							yOrient={yOrient}
							gridHorizontal={props.gridHorizontal}
							gridHorizontalStroke={props.gridHorizontalStroke}
							gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
							gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
						/>
						<XAxis
							xAxisClassName={props.xAxisClassName}
							xAxisTickValues={props.xAxisTickValues}
							xAxisLabel={props.xAxisLabel}
							xAxisLabelOffset={props.xAxisLabelOffset}
							xScale={xScale}
							margins={svgMargins}
							tickFormatting={props.xAxisFormatter}
							width={innerWidth}
							height={innerHeight}
							horizontalChart={props.horizontal}
							xOrient={props.xOrient}
							yOrient={yOrient}
							gridVertical={props.gridVertical}
							gridVerticalStroke={props.gridVerticalStroke}
							gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
							gridVerticalStrokeDash={props.gridVerticalStrokeDash}
						/>
						{/* <DataSeries
							yScale={yScale}
							xScale={xScale}
							margins={svgMargins}
							_data={_data}
							series={series}
							width={innerWidth}
							height={innerHeight}
							colors={props.colors}
							colorAccessor={props.colorAccessor}
							hoverAnimation={props.hoverAnimation}
							valuesAccessor={props.valuesAccessor}
							onMouseOver={this.onMouseOver}
							onMouseLeave={this.onMouseLeave}
						/> */}
					</g>
				</Chart>
				{(props.showTooltip ? <Tooltip {...this.state.tooltip} /> : null)}
			</span>
		)
	}
}

export default BarChart
