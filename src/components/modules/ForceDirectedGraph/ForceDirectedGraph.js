import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'
import Tooltip from '../../basic/Tooltip'
import { addEvent, removeEvent } from '../../../utils/utils'

class ForceDirectedGraph extends Component {
	static defaultProps = {
		width: 1000,
		height: 500,
		interactive: true,
		tooltip: []
	}
	constructor(props) {
		super(props)
		this.state = {
			linkData: [],
			nodeData: [],
			content: '',
			tooltipStyle: { left: 0, top: 0 },
			activeIdx: null
		}
	}

	componentWillUnmount() {
		removeEvent(this.nodesContainer, 'mouseleave', this.handleMouseOut)
	}
	componentDidMount() {
		this.renderData()
		addEvent(this.nodesContainer, 'mouseleave', this.handleMouseOut)
	}
	componentDidUpdate(){
		this.renderData()
	}
	renderData = () => {
		const { data, width, height } = this.props
		let simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(d => d.id))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2))

		simulation
			.on("tick", () => {
				// tick 表示运动的每一步，这样每次都会更新linkData,nodeData
				this.setState({
					linkData: data.links,
					nodeData: data.nodes
				})
			})
	}
	dragged(e, d) {
		console.log(e, d)
		d.fx = d3.event.x
		d.fy = d3.event.y
	}
	dragstarted(e, d) {
		console.log(e, d)
		let simulation = this.state.simulation
		if (!d3.event.active) simulation.alphaTarget(0.3).restart()
		d.fx = d.x
		d.fy = d.y
	}
	dragended(e, d) {
		console.log(e, d)
		let simulation = this.state.simulation
		if (!d3.event.active) simulation.alphaTarget(0)
		d.fx = null
		d.fy = null
	}
	handleMouseOver = (e, value, index) => {
		const { tooltip } = this.props
		e = e || window.event
		let contentArr = []
		if (tooltip && tooltip.length > 0) {
			tooltip.forEach(d => {
				let str = d + ':' + value[d]
				contentArr.push(str)
			})
		}
		this.setState({
			content: contentArr.join(','),
			tooltipStyle: {
				left: e.screenX + 10,
				top: e.screenY - 140,
				opacity: 0.9,
				display: 'block'
			},
			activeIdx: index
		})
	}
	handleMouseOut = () => {
		this.setState({
			tooltipStyle: {
				opacity: 0
			},
			activeIdx: '0'
		})
	}
	render({ width, height, interactive }, { linkData, nodeData, content, tooltipStyle, activeIdx }) {
		let color = d3.scaleOrdinal(d3.schemeCategory20)
		return (
			<div class={styles.container}>
				<Tooltip
					content={content}
					tooltipStyle={tooltipStyle}
				/>
				<svg ref={el => this.forceDirected = el} width={width} height={height} >
					<g class={styles.links}>
						{linkData && linkData.map((d, index) => {
							return (
								<line
									class={styles.links}
									x1={d.source.x}
									y1={d.source.y}
									x2={d.target.x}
									y2={d.target.y}
									stroke-width={Math.sqrt(d.value)}
									key={index}
								/>
							)
						})}
					</g>
					<g id="nodes" draggable ref={el => this.nodesContainer = el}>
						{nodeData && nodeData.map((d, index) => {
							return (
								<circle
									class={styles.node}
									onMouseOver={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
									onMouseMove={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
									onDragtart={(e) => this.dragstarted(e, d)}
									onDrag={(e) => this.dragged(e, d)}
									onDragEnd={(e) => this.dragended(e, d)}
									cx={d.x}
									cy={d.y}
									key={index}
									r={activeIdx === index ? "7" : "5"}
									style={{ opacity: activeIdx === index ? 0.8 : 1 }}
									fill={color(d.group)} />
							)
						})}
					</g>}
				</svg>
			</div>
		)
	}
}

export default ForceDirectedGraph
