import { h, Component } from 'preact'
import * as d3 from 'd3'
// import styles from './index.less'

// let continent = ['亚洲','欧洲','非洲','美洲','大洋洲']

let population = [
	[9000,870,3000,1000,5200],
	[3400,8000,2300,4922,374],
	[2000,2000,7700,4881,1050],
	[3000,8012,5531,500,400],
	[3540,4310,1500,1900,300]
]
export default class ChordDiagram extends Component{
	static defaultProps = {
		width:500,
		height:500,
		arcWidth:10,	//外弧的宽度，最大不超过宽度/高度的1/3
		padding:40,		// padding，最大不超过宽度/高度的1/3
		padAngle:0.03   // 弦的间隔，[0,0.1]
	}
	constructor(props){
		super(props)
		this.state = {

		}
	}
	componentDidMount(){
		const {width,height,arcWidth,padding,padAngle} = this.props
		  let svg = d3.select("svg"),
			  outerRadius = Math.min(width, height) * 0.5 - (padding > Math.min(width, height)/3 ? Math.min(width, height)/3 : padding < 0 ? 0 : padding),
			  innerRadius = outerRadius - (arcWidth > Math.min(width, height)/3?Math.min(width, height)/3:arcWidth<0?0:arcWidth)

		  let formatValue = d3.formatPrefix(",.0", 1e3)

		  let chord = d3.chord()
			  .padAngle(padAngle > 0.1? 0.1:padAngle < 0?0:padAngle)
			  .sortSubgroups(d3.descending)

		  let arc = d3.arc()
			  .innerRadius(innerRadius)
			  .outerRadius(outerRadius)

		  let ribbon = d3.ribbon()
			  .radius(innerRadius)

		  let color = d3.scaleOrdinal()
			  .domain(d3.range(5))
			  .range(["#000000", "#FFDD89", "#957244", "#F26223","#dadada"])

		  let g = svg.append("g")
			  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
			  .datum(chord(population))

		  let group = g.append("g")
			  .attr("class", "groups")
			.selectAll("g")
			.data((chords) =>chords.groups)
			.enter().append("g")

		  group.append("path")
			  .style("fill", d => color(d.index))
			  .style("stroke", (d) => d3.rgb(color(d.index)).darker())
			  .attr("d", arc)

		  let groupTick = group.selectAll(".group-tick")
			.data(d=>groupTicks(d, 1e3))
			.enter().append("g")
			  .attr("class", "group-tick")
			  .attr("transform", d=> "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)" )

		  groupTick.append("line")
			  .attr("x2", 6)

		  groupTick
			.filter(d=> d.value % 5e3 === 0 )
			.append("text")
			  .attr("x", 8)
			  .attr("dy", ".35em")
			  .attr("transform", d=> d.angle > Math.PI ? "rotate(180) translate(-16)" : null )
			  .style("text-anchor", d =>d.angle > Math.PI ? "end" : null )
			  .text( d => formatValue(d.value) )

		  g.append("g")
			  .attr("class", "ribbons")
			.selectAll("path")
			.data( chords => chords )
			.enter().append("path")
			  .attr("d", ribbon)
			  .style("fill", d => color(d.target.index) )
			  .style("stroke", d=> d3.rgb(color(d.target.index)).darker() )

		  // Returns an array of tick angles and values for a given group and step.
		  function groupTicks(d, step) {
			let k = (d.endAngle - d.startAngle) / d.value
			return d3.range(0, d.value, step).map(value =>{
			  return {value, angle: value * k + d.startAngle}
			})
		  }
	}
	render({width,height}){
		return (
			<div>
				<svg width={width} height={height} />
			</div>
		)
	}
}
