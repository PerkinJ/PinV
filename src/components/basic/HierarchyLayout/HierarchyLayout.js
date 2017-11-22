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
		dataKey: '',
		nameKey: '',
		type: 'tree',
		tile: 'treemapSquarify', //表示生成矩形树的tiling method 算法
		ratio: 2, 	// 当tile为 treemapSquarify,才有效，表示生成矩形的理论长宽比
		paddingOuter: 20,
		paddingInner:0,
		rectPadding:0,
		paddingLeft:0,
		paddingRight:0,
		paddingTop:0,
		paddingBottom:0
	}
	handleMouseOver = (e, d, index) => {
		const { dataKey, nameKey } = this.props
		let isHasVal = Object.keys(d.data).indexOf(dataKey)
		let name = d.data[nameKey]
		let valueStr = isHasVal > -1 ? `,${dataKey}:${d.data[dataKey]}` : ''
		this.setState({
			activeIdx: index,
			content: `${nameKey}: ${name}${valueStr}`,
			tooltipStyle: { left: e.pageX, top: e.offsetY, opacity: 0.9 }
		})
	}
	handleMouseOut = () => {
		this.setState({
			activeIdx: '0',
			content: '',
			tooltipStyle: { opacity: 0 }
		})
	}
	render({ width, height, padding, data, interactive, type }, { tooltipStyle, content, activeIdx }) {
		let root = d3.hierarchy(data)
		switch (type) {
			case 'tree':
			case 'cluster': {
				let treeLayout = type === 'tree' ? d3.tree() : d3.cluster()
				treeLayout.size([width - padding.left - padding.right, height - padding.top - padding.bottom - 60])
				treeLayout(root)
				let descendantsData = root.descendants(), linkData = root.links()
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
											onMouseOut={interactive ? this.handleMouseOut : null}
											onMouseMove={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											onMouseOver={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
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
			case 'treemap': {
				const { rectPadding,paddingOuter,paddingInner,paddingLeft,paddingRight,paddingTop,paddingBottom, tile, ratio } = this.props
				let treemapLayout = d3.treemap()
				treemapLayout.size([width, height])
				paddingOuter?treemapLayout.paddingOuter(paddingOuter):''
				paddingInner?treemapLayout.paddingInner(paddingInner):''
				paddingLeft?treemapLayout.paddingLeft(paddingLeft):''
				paddingRight?treemapLayout.paddingRight(paddingRight):''
				paddingTop?treemapLayout.paddingTop(paddingTop):''
				paddingBottom?treemapLayout.paddingBottom(paddingBottom):''
				rectPadding?treemapLayout.padding(rectPadding):''
				/* paddingTop, paddingRight, Left and Bottom available */
				// treemapDice,treemapSlice,treemapSquarify,treemapResquarify
				switch (tile) {
					case 'treemapBinary':
						treemapLayout.tile(d3.treemapBinary)
						break
					case 'treemapDice':
						treemapLayout.tile(d3.treemapDice)
						break
					case 'treemapSlice':
						treemapLayout.tile(d3.treemapSlice)
						break
					case 'treemapResquarify':
						treemapLayout.tile(d3.treemapResquarify)
						break
					default:
						treemapLayout.tile(d3.treemapSquarify.ratio(ratio))
				}
				root.sum(d => d.value)
				treemapLayout(root)
				let treemapData = root.descendants()
				return (
					<div class={styles.container}>
						<Tooltip
							content={content}
							tooltipStyle={tooltipStyle}
						/>
						<svg ref={el => this.treemap = el} class="graph" id="treemap" width={width} height={height}>
							<g>
								{treemapData && treemapData.map((d, index) => {
									return (
										<g
											onMouseOut={interactive ? this.handleMouseOut : null}
											onMouseMove={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											onMouseOver={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											key={index + 1} class={styles.node} transform={`translate(${[d.x0, d.y0]})`}>
											<rect
												width={d.x1 - d.x0}
												height={d.y1 - d.y0}
												fill={activeIdx === index ? "rgba(255,100,0,0.8)" : "rgba(255,255,255,0.2)"}
												stroke="#2f2f2f"
											/>
											<text
												dx="12"
												dy="14"
												fill={activeIdx === index ? "#fff" : "#000"}>
												{d.data.name}
											</text>
										</g>
									)
								})}

							</g>
						</svg>
					</div>
				)
			}
		}
	}
}

export default HierarchyLayout
