import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.css'

class ForceDirecteddata extends Component {
	static defaultProps = {
		width: 1000,
		height: 500,
		interactive: true,
		tooltip: [],
		velocityDecay:0.5,
		strength:-50,
		collide:12.5,
		distance:20
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentWillUnmount() {
		// removeEvent(this.nodesContainer, 'mouseleave', this.handleMouseOut)
	}
	componentDidMount() {
		this.renderData()
		// addEvent(this.nodesContainer, 'mouseleave', this.handleMouseOut)
	}
	renderData = () => {
		let color = d3.scaleOrdinal(d3.schemeCategory20)

		const { data, width, height, interactive,velocityDecay,strength,collide,distance } = this.props

		let simulation = d3.forceSimulation()
			.velocityDecay(velocityDecay)
			.force("link", d3.forceLink().id(d => d.id))
			.force("charge", d3.forceManyBody().strength(strength))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force('collide',d3.forceCollide(collide))

		let svg = d3.select(this.forceDirected)
		let link = svg.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(data.links)
			.enter().append("line")
			.attr("stroke-width", (d) => Math.sqrt(d.value))
			.attr('stroke', '#999')
			.attr('stroke-opacity', 0.6)

		let node = svg.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(data.nodes)
			.enter().append("circle")
			.attr("r", 5)
			.attr("fill", (d) => color(d.group))
			.attr('stroke','#fff')
			.attr('stroke-width','1.5')
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended))
			.on('mouseover', interactive?(d) => this.handleMouseOver(d):null)
			.on('mouseout', interactive?this.handleMouseOut:null)
			.on('mousemove', interactive?(d) => this.handleMouseOver(d):null)

		simulation
			.nodes(data.nodes)
			.on("tick", ticked)

		simulation.force("link")
			.links(data.links)
			.distance(distance)

		function ticked() {
			link
				.attr("x1", (d) => d.source.x)
				.attr("y1", (d) => d.source.y)
				.attr("x2", (d) => d.target.x)
				.attr("y2", (d) => d.target.y)

			node
				.attr("cx", (d) => d.x)
				.attr("cy", (d) => d.y)
		}

		function dragstarted(d) {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart()
			d.fx = d.x
			d.fy = d.y
		}

		function dragged(d) {
			d.fx = d3.event.x
			d.fy = d3.event.y
		}

		function dragended(d) {
			if (!d3.event.active) simulation.alphaTarget(0)
			d.fx = null
			d.fy = null
		}
	}
	handleMouseOver = (value) => {
		const { tooltip } = this.props
		let contentArr = []
		if (tooltip && tooltip.length > 0) {
			tooltip.forEach(d => {
				let str = d + ':' + value[d]
				contentArr.push(str)
			})
		}
		let tool = d3.select(this.tooltip)
		let content = contentArr.join(',')
		tool.html(content)
			.style('left', `${d3.event.pageX + 10}px`)
			.style('top', `${d3.event.clientY}px`)
			.style('opacity', 1)
	}
	handleMouseMove = () => {
		let tool = d3.select(this.tooltip)
		tool.html('')
			.style('left', `${d3.event.pageX + 10}px`)
			.style('top', `${d3.event.clientY}px`)
	}
	handleMouseOut = () => {
		let tool = d3.select(this.tooltip)
		tool.html('').style('opacity', 0)
	}
	render({ width, height }, { }) {
		return (
			<div class={styles.container}>
				<div class={styles.tooltip} ref={el => this.tooltip = el} />
				<svg ref={el => this.forceDirected = el} width={width} height={height} />
			</div>
		)
	}
}

export default ForceDirecteddata
