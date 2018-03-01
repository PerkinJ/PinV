import { h, Component } from 'preact'
import * as d3 from 'd3'
import { Tooltip } from '../../common'
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
		width: 360,
		height: 200,
		XAxis: 'letter',
		YAxis: 'frequency',
		axesColor: 'rgb(243,198,76)',
		tickTextStroke: 'rgb(243,198,76)',
		tickStroke: 'rgb(243,198,76)',
		textColor: 'rgb(243,198,76)',
		stroke: 'rgb(9,80,145)',
		tickFormat: (y) => y,
		yAxisLabel: '',
		showTooltip: true,
		tooltipColor: '#000'
	}
	componentDidMount() {
		let { data, XAxis, YAxis, axesColor, tickTextStroke, tickStroke, stroke, domain, tickFormat, yAxisLabel } = this.props
		let margin = { top: 20, right: 20, bottom: 30, left: 40 },
			width = this.props.width - margin.left - margin.right,
			height = this.props.height - margin.top - margin.bottom
		let xDomain = data.map(d => d[XAxis])
		let x = d3.scaleBand().domain(xDomain).range([0, width]).paddingInner(0.1)

		let y = d3.scaleLinear()
			.domain(domain.y)
			.range([height, 0])

		let xAxis = d3.axisBottom(x)
		let yAxis = d3.axisLeft(y).tickFormat(tickFormat)

		let svg = d3.select(this.barchart)
			.attr("width", this.props.width)
			.attr("height", this.props.height)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		svg.append("g")
			.attr("class", "x axis")
			.attr('stroke', tickTextStroke)
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.attr("dominant-baseline", "middle")

		svg.selectAll('.x text')
			.attr("y", "-.71em")
			.attr('x', "-.71em")
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.attr("transform", "rotate(-90)")


		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.attr('stroke', tickTextStroke)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text(yAxisLabel)

		svg.selectAll('.domain').attr('stroke', axesColor)

		svg.selectAll('.tick line').attr('stroke', tickStroke)

		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", d => x(d[XAxis]))
			.attr("width", x.bandwidth())
			.attr('fill', stroke)
			.attr("y", d => y(d[YAxis]))
			.attr("height", (d) => height - y(d[YAxis]))
			.on('mouseover', this.handleMouseOver)
			.on('mouseout',this.handleMouseOut)
	}
	handleMouseOver = (data) => {
		if (!this.props.showTooltip)
			return
		this.setState({
			tooltip: {
				x:d3.event.x + 5,
				y:d3.event.y,
				child: `${data.type}:${data.value}`,
				show: true
			},
			changeState: true
		})
	}
	handleMouseOut = () =>{
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
	render({ width, height, showTooltip,tooltipColor }) {
		return (
			<div>
				<svg ref={el => this.barchart = el} width={width} height={height} />
				{(showTooltip ? <Tooltip tooltipColor={tooltipColor} {...this.state.tooltip} /> : null)}
			</div>
		)
	}
}

export default BarChart
