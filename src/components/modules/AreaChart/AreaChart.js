import { h, Component } from 'preact'
import { Chart, XAxis, YAxis } from '../../common'
import * as d3 from 'd3'
import DataSeries from './DataSeries'

class AreaChart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fill: this.props.fill
		}
	}
	static defaultProps = {
		margins: { top: 10, right: 20, bottom: 40, left: 45 },
		yAxisTickCount: 4,
		interpolate: false,
		interpolationType: null,
		className: 'areachart',
		hoverAnimation: true,
		//CartesianChartProps
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
		// defaulr Accessor
		xAccessor: (d) => d.x,
		yAccessor: (d) => d.y

	}
	getViewBox = () => {
		if (this.props.viewBoxObject) {
			let v = this.props.viewBoxObject
			return [v.x, v.y, v.width, v.height].join(' ')
		} else if (this.props.viewBox) {
			return this.props.viewBox
		}
	}

	getDimensions = () => {
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
	getYOrient = () => {
		let yOrient = this.props.yOrient

		if (yOrient === 'default') {
			return this.props.horizontal ? 'right' : 'left'
		}

		return yOrient
	}
	render() {
		let props = this.props

		let data = props.data

		let interpolationType = props.interpolationType || (props.interpolate ? 'cardinal' : 'linear')

		let { innerWidth, innerHeight, trans, svgMargins } = this.getDimensions()
		let yOrient = this.getYOrient()

		if (!Array.isArray(data)) {
			data = [data]
		}

		let yScale = d3.scaleLinear()
			.range([innerHeight, 0])

		let xValues = []
		let yValues = []
		let seriesNames = []
		let yMaxValues = []
		let domain = props.domain || {}
		let xDomain = domain.x || []
		let yDomain = domain.y || []
		data.forEach((series) => {
			let upper = 0
			seriesNames.push(series.name)
			series.values.forEach((val) => {
				upper = Math.max(upper, props.yAccessor(val))
				xValues.push(props.xAccessor(val))
				yValues.push(props.yAccessor(val))
			})
			yMaxValues.push(upper)
		})

		let xScale
		if (xValues.length > 0 && Object.prototype.toString.call(xValues[0]) === '[object Date]' && props.xAxisTickInterval) {
			xScale = d3.scaleTime()
				.range([0, innerWidth])
		} else {
			xScale = d3.scaleLinear()
				.range([0, innerWidth])
		}

		let xdomain = d3.extent(xValues)
		if (xDomain[0] !== undefined && xDomain[0] !== null) xdomain[0] = xDomain[0]
		if (xDomain[1] !== undefined && xDomain[1] !== null) xdomain[1] = xDomain[1]
		xScale.domain(xdomain)
		let ydomain = [0, d3.sum(yMaxValues)]
		if (yDomain[0] !== undefined && yDomain[0] !== null) ydomain[0] = yDomain[0]
		if (yDomain[1] !== undefined && yDomain[1] !== null) ydomain[1] = yDomain[1]
		yScale.domain(ydomain)

		props.colors.domain(seriesNames)

		let stack = d3.stack()
			// .keys((d)=>{
			// 	let data = []
			// 	data.push(props.xAccessor(d))
			// 	console.log('222',d,data)
			// 	return data
			// })
			// .value(props.yAccessor)
			.value((d) => {
				return d.values
			})

		let layers = stack(data)
		let dataSeries = layers.map((d, idx) => {
			return (
				<DataSeries
					key={idx}
					seriesName={d.name}
					fill={props.colors(props.colorAccessor(d, idx))}
					index={idx}
					xScale={xScale}
					yScale={yScale}
					data={d.values}
					xAccessor={props.xAccessor}
					yAccessor={props.yAccessor}
					interpolationType={interpolationType}
					hoverAnimation={props.hoverAnimation}
				/>
			)
		})
		return (
			<Chart
				viewBox={this.getViewBox()}
				legend={props.legend}
				data={data}
				margins={props.margins}
				colors={props.colors}
				colorAccessor={props.colorAccessor}
				width={props.width}
				height={props.height}
				title={props.title}
			>
				<g transform={trans} className={props.className}>
					<XAxis
						xAxisClassName='areachart-xaxis'
						xScale={xScale}
						xAxisTickValues={props.xAxisTickValues}
						xAxisTickInterval={props.xAxisTickInterval}
						xAxisTickCount={props.xAxisTickCount}
						xAxisLabel={props.xAxisLabel}
						xAxisLabelOffset={props.xAxisLabelOffset}
						tickFormatting={props.xAxisFormatter}
						xOrient={props.xOrient}
						yOrient={yOrient}
						margins={svgMargins}
						width={innerWidth}
						height={innerHeight}
						horizontalChart={props.horizontal}
						gridVertical={props.gridVertical}
						gridVerticalStroke={props.gridVerticalStroke}
						gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
						gridVerticalStrokeDash={props.gridVerticalStrokeDash}
					/>
					<YAxis
						yAxisClassName='areachart-yaxis'
						yScale={yScale}
						yAxisTickValues={props.yAxisTickValues}
						yAxisTickInterval={props.yAxisTickInterval}
						yAxisTickCount={props.yAxisTickCount}
						yAxisLabel={props.yAxisLabel}
						yAxisLabelOffset={props.yAxisLabelOffset}
						tickFormatting={props.yAxisFormatter}
						xOrient={props.xOrient}
						yOrient={yOrient}
						margins={svgMargins}
						width={innerWidth}
						height={props.height}
						horizontalChart={props.horizontal}
						gridHorizontal={props.gridHorizontal}
						gridHorizontalStroke={props.gridHorizontalStroke}
						gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
						gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
					/>
					{dataSeries}
				</g>
			</Chart>
		)
	}
}

export default AreaChart
