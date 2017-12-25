// import { h, Component } from 'preact'
// import * as d3 from 'd3'


// class StreamGraph extends Component {
// 	constructor(props) {
// 		super(props)
// 	}
// 	static defaultProps = {
// 		width: 660,
// 		height: 600,
// 		padding: { top: 20, right: 20, bottom: 30, left: 50 }
// 	}
// 	componentDidMount() {
// 		chart("../../../demo/mock/streamData.csv", "orange")

// 		let datearray = []
// 		let colorrange = []


// 		function chart(csvpath, color) {

// 			if (color === "blue") {
// 				colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"]
// 			}
// 			else if (color === "pink") {
// 				colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"]
// 			}
// 			else if (color === "orange") {
// 				colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"]
// 			}
// 			let strokecolor = colorrange[0]

// 			let format = d3.timeFormat("%m/%d/%y")

// 			let margin = { top: 20, right: 40, bottom: 30, left: 30 }
// 			let width = document.body.clientWidth - margin.left - margin.right
// 			let height = 400 - margin.top - margin.bottom

// 			let tooltip = d3.select("body")
// 				.append("div")
// 				.attr("class", "remove")
// 				.style("position", "absolute")
// 				.style("z-index", "20")
// 				.style("visibility", "hidden")
// 				.style("top", "30px")
// 				.style("left", "55px")

// 			let x = d3.scaleTime()
// 				.range([0, width])

// 			let y = d3.scaleLinear()
// 				.range([height - 10, 0])

// 			let z = d3.scaleOrdinal()
// 				.range(colorrange)

// 			let xAxis = d3.axisTop()
// 				.scale(x)
// 				.ticks(d3.timeWeeks)

// 			let yAxis = d3.axisLeft()
// 				.scale(y)

// 			// let yAxisr = d3.svg.axis()
// 			// 	.scale(y)

// 			// let stack = d3.stack()
// 			// 	.keys((d)=>d.key)
// 			// 	.values(function (d) { return d.values })
// 			// 	.offset(d3.stackOffsetSilhouette)

// 			let stack = d3.stack()
// 				// .value(function(d) { return d.values })
// 				// .x(function(d) { return d.date })
// 				// .y(function(d) { return d.value })
// 				.offset(d3.stackOffsetSilhouette)


// 			let nest = d3.nest()
// 				.key(function (d) {
// 					console.log(d)
// 					return d.key })

// 			let area = d3.area()
// 				// .interpolateCardinal()
// 				.x(function (d) { return x(d.date) })
// 				.y0(function (d) { return y(d.y0) })
// 				.y1(function (d) { return y(d.y0 + d.y) })

// 			let svg = d3.select(".chart").append("svg")
// 				.attr("width", width + margin.left + margin.right)
// 				.attr("height", height + margin.top + margin.bottom)
// 				.append("g")
// 				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// 			let graph = d3.csv(csvpath, (data) =>{
// 				data.forEach(function (d) {
// 					// d.date =d3.timeParse(d.date)
// 					d.value = +d.value
// 				})
// 				let layers = stack(nest.entries(data))

// 				x.domain(d3.extent(data, function (d) { return d.date }))
// 				y.domain([0, d3.max(data, function (d) { return d.y0 + d.y })])

// 				svg.selectAll(".layer")
// 					.data(layers)
// 					.enter().append("path")
// 					.attr("class", "layer")
// 					.attr("d", function (d) { return area(d.values) })
// 					.style("fill", function (d, i) { return z(i) })


// 				svg.append("g")
// 					.attr("class", "x axis")
// 					.attr("transform", "translate(0," + height + ")")
// 					.call(xAxis)

// 				svg.append("g")
// 					.attr("class", "y axis")
// 					.attr("transform", "translate(" + width + ", 0)")
// 					.call(yAxis.orient("right"))

// 				svg.append("g")
// 					.attr("class", "y axis")
// 					.call(yAxis.orient("left"))

// 				svg.selectAll(".layer")
// 					.attr("opacity", 1)
// 					.on("mouseover", function (d, i) {
// 						svg.selectAll(".layer").transition()
// 							.duration(250)
// 							.attr("opacity", function (d, j) {
// 								return j != i ? 0.6 : 1
// 							})
// 					})

// 					.on("mousemove", function (d, i) {
// 						mousex = d3.mouse(this)
// 						mousex = mousex[0]
// 						let invertedx = x.invert(mousex)
// 						invertedx = invertedx.getMonth() + invertedx.getDate()
// 						let selected = (d.values)
// 						for (let k = 0;k < selected.length;k++) {
// 							datearray[k] = selected[k].date
// 							datearray[k] = datearray[k].getMonth() + datearray[k].getDate()
// 						}

// 						mousedate = datearray.indexOf(invertedx)
// 						pro = d.values[mousedate].value

// 						d3.select(this)
// 							.classed("hover", true)
// 							.attr("stroke", strokecolor)
// 							.attr("stroke-width", "0.5px"),
// 							tooltip.html("<p>" + d.key + "<br>" + pro + "</p>").style("visibility", "visible")

// 					})
// 					.on("mouseout", function (d, i) {
// 						svg.selectAll(".layer")
// 							.transition()
// 							.duration(250)
// 							.attr("opacity", "1")
// 						d3.select(this)
// 							.classed("hover", false)
// 							.attr("stroke-width", "0px"), tooltip.html("<p>" + d.key + "<br>" + pro + "</p>").style("visibility", "hidden")
// 					})

// 				let vertical = d3.select(".chart")
// 					.append("div")
// 					.attr("class", "remove")
// 					.style("position", "absolute")
// 					.style("z-index", "19")
// 					.style("width", "1px")
// 					.style("height", "380px")
// 					.style("top", "10px")
// 					.style("bottom", "30px")
// 					.style("left", "0px")
// 					.style("background", "#fff")

// 				d3.select(".chart")
// 					.on("mousemove", function () {
// 						mousex = d3.mouse(this)
// 						mousex = mousex[0] + 5
// 						vertical.style("left", mousex + "px")
// 					})
// 					.on("mouseover", function () {
// 						mousex = d3.mouse(this)
// 						mousex = mousex[0] + 5
// 						vertical.style("left", mousex + "px")
// 					})
// 			})
// 		}
// 	}

// 	render({ width, height, padding, }, { }) {

// 		return (
// 			<div>
// 				<svg width={width} height={height} ref={el => this.StreamGraph = el} >

// 				</svg>
// 			</div>
// 		)
// 	}
// }

// export default StreamGraph
