import { h, Component } from 'preact'
import * as d3 from 'd3'


class StackedAreaChart extends Component {
	constructor(props) {
		super(props)
	}
	static defaultProps = {
		width:660,
		height:600,
		padding:{ top: 20, right: 20, bottom: 30, left: 50 }
	}
	componentDidMount() {
		this.renderData()
	}
	renderData = () => {
		const {width,height,padding} = this.props
		let stackedAreaChart = d3.select(this.stackedAreaChart),
			chartWidth = width - padding.left - padding.right,
			chartHeight = height - padding.top - padding.bottom

		let parseDate = d3.timeParse("%Y %b %d")

		let x = d3.scaleTime().range([0, chartWidth]),
			y = d3.scaleLinear().range([chartHeight, 0]),
			z = d3.scaleOrdinal(d3.schemeCategory10)

		let stack = d3.stack()

		let area = d3.area()
			.x(function (d) { return x(d.data.date) })
			.y0(function (d) { return y(d[0]) })
			.y1(function (d) { return y(d[1]) })

		let g = stackedAreaChart.append("g")
			.attr("transform", "translate(" + padding.left + "," + padding.top + ")")

		d3.tsv("../../../demo/mock/stackedArea.tsv", type,  (error, data) =>{
			if (error) throw error

			let keys = data.columns.slice(1)

			x.domain(d3.extent(data,(d)=> d.date ))
			z.domain(keys)
			stack.keys(keys)


			let layer = g.selectAll(".layer")
				.data(stack(data))
				.enter().append("g")
				.attr("class", "layer")

			layer.append("path")
				.attr("class", "area")
				.style("fill", function (d) { return z(d.key) })
				.attr("d", area)

			layer.filter(function (d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01 })
				.append("text")
				.attr("x", chartWidth - 6)
				.attr("y", function (d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2) })
				.attr("dy", ".35em")
				.style("font", "10px sans-serif")
				.style("text-anchor", "end")
				.text(function (d) { return d.key })

			g.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + chartHeight + ")")
				.call(d3.axisBottom(x))

			g.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y).ticks(10, "%"))

			this.setState({
				data,
				stackData:stack(data)
			})
		})

		function type(d, i, columns) {
			d.date = parseDate(d.date)
			for (let i = 1, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]] / 100
			return d
		}
	}
	render({width,height,padding},{stackData}) {
		const stackedAreaChartProps = {
			width,
			height
		}
		let chartWidth = width - padding.left - padding.right,
			chartHeight = height - padding.top - padding.bottom

		let x = d3.scaleTime().range([0, chartWidth]),
			y = d3.scaleLinear().range([chartHeight, 0]),
			z = d3.scaleOrdinal(d3.schemeCategory10)

		let area = d3.area()
			.x(d => x(d.data.date) )
			.y0(d => y(d[0]))
			.y1(d => y(d[1]))
		return (
			<div>
				<svg ref={el=>this.stackedAreaChart = el} {...stackedAreaChartProps}>
					<g transfrom={`translate(${padding.left},${padding.top}`}>
						{!!stackData&&stackData.map((d,index)=>{
							return (
								<g class="layer" key={index}>
									<path class="area" d={area(d)} style={{fill:z(d.key)}}/>
								</g>
						 )})}
					</g>
				</svg>
			</div>
		)
	}
}

export default StackedAreaChart
