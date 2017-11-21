import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'
import Tooltip from '../Tooltip'

class HierarchyLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			descendantsData: [],
			linkData: []
		}
	}
	static defaultProps = {
		width: 400,
		height: 300,
		padding: { left: 0, right: 0, top: 0, bottom: 0 },
		dataKey:'',
		nameKey:'',
		type:'tree'
	}
	handleMouseOver = (e,d,index) => {
		const {dataKey,nameKey} = this.props
		let isHasVal = Object.keys(d.data).indexOf(dataKey)
		let name = d.data[nameKey]
		let valueStr = isHasVal > -1?`,${dataKey}:${d.data[dataKey]}`:''
		this.setState({
			activeIdx: index,
			content:`${nameKey}: ${name}${valueStr}`,
			tooltipStyle:{left:e.pageX,top:e.offsetY,opacity:0.9}
		})
	}
	handleMouseOut = () => {
		this.setState({
			activeIdx: '0',
			content:'',
			tooltipStyle:{opacity:0}
		 })
	}
	render({ width, height, padding,data,interactive,type }, {tooltipStyle, content, activeIdx }) {
		let root = d3.hierarchy(data)
		let treeLayout = type === 'tree'?d3.tree():d3.cluster()
		treeLayout.size([width - padding.left - padding.right, height - padding.top - padding.bottom - 60])
		treeLayout(root)
		let descendantsData = root.descendants(),linkData = root.links()
		return (
			<div class={styles.container}>
				<Tooltip
					content={content}
					tooltipStyle={tooltipStyle}
				/>
				<svg
					transform={`translate(${padding.left},${padding.top})`}
					ref={el => this.tree = el}
					viewBox="0 0 400 240"
					class={styles.graph}
					width={width}
					height={height}>
					<g >
						<g class={styles.links}>
							{linkData && linkData.map((d, index) =>
								<g key={index}>
									<line x1={d.source.x} y1={d.source.y} x2={d.target.x} y2={d.target.y} stroke="#5f5f5f" />
								</g>
							)}
						</g>
						<g class={styles.nodes}>
							{descendantsData && descendantsData.map((d, index) =>
								<g
									onMouseOut={interactive?this.handleMouseOut:null}
									onMouseMove={interactive?(e) => this.handleMouseOver(e,d,index):null}
									onMouseOver={interactive?(e) => this.handleMouseOver(e,d,index):null}
									class={styles.node}>
									<circle
										class={styles.solid}
										cx={d.x}
										cy={d.y}
										r={activeIdx === index ? "18" : "14"}
										key={index + 1}
										fill={activeIdx === index ? "rgba(255,100,0,0.8)" : "#f04134"} />
									<text
										fill={activeIdx === index ? "#fff" : "#000"}
										class={styles.label}
										dx={d.x - 9}
										dy={d.y + 5}>
										{d.data.name}
									</text>
								</g>
							)}
						</g>
					</g>
				</svg>
			</div>
		)
	}
}

export default HierarchyLayout
