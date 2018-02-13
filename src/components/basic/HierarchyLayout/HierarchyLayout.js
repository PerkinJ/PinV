import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'
import Tooltip from '../../common/Tooltip'
class HierarchyLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			descendantsData: [],
			linkData: [],
			content:'',
			tooltip:{},
			sunburstHighlight:false  //sunburst高亮的标志,悬浮某节点时为true，其他节点变暗
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
		paddingInner: 0,
		rectPadding: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		partitionPadding: 0,   //partition's padding
		packPadding: 10,      // pack's padding
		angle: 1,			// SunburstLayout 的angle范围[0-1]
		backgroundColor: '#CDDC39',	// 默认背景颜色
		hoverColor: 'rgba(139,195,74,0.8)',		// 悬浮颜色
		onClick:null
	}
	handleClick = (e, d, index)=>{
		const {onClick} = this.props
		onClick && onClick(e, d, index)
	}
	handleMouseOver = (e, d, index) => {
		const { dataKey, nameKey,onMouseOver } = this.props
		let isHasVal = Object.keys(d.data).indexOf(dataKey)
		let name = d.data[nameKey]
		let valueStr = isHasVal > -1 ? `,${dataKey}:${d.data[dataKey]}` : ''
		this.setState({
			activeIdx: index,
			content:`${nameKey}: ${name}${valueStr}`,
			tooltip: {
				x: e.screenX + 20,
				y: e.screenY - 120,
				child:  `${nameKey}: ${name}${valueStr}`,
				show: true
			},
			sunburstHighlight:true
		})
		onMouseOver && onMouseOver()
	}
	handleMouseOut = () => {
		const {onMouseOut} = this.props
		this.setState({
			activeIdx: '0',
			content:'',
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			},
			sunburstHighlight:false
		})
		onMouseOut && onMouseOut()
	}
	computeTextRotation = (d) => {
		let angle = (d.x0 + d.x1) / Math.PI * 90
		return (angle < 180) ? angle - 90 : angle + 90
	}
	render({ width, height, padding, data, interactive, type, backgroundColor, hoverColor }, { tooltip,content, activeIdx,sunburstHighlight }) {
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
						<Tooltip {...tooltip} />
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
												fill={activeIdx === index ? hoverColor : backgroundColor} />
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
			case 'treemap':
			case 'partition': {
				const { rectPadding, paddingOuter, paddingInner, paddingLeft, paddingRight, paddingTop, paddingBottom, tile, ratio } = this.props
				let layout = type === 'treemap' ? d3.treemap() : d3.partition()
				layout.size([width, height])
				if (type === 'treemap') {
					paddingOuter ? layout.paddingOuter(paddingOuter) : ''
					paddingInner ? layout.paddingInner(paddingInner) : ''
					paddingLeft ? layout.paddingLeft(paddingLeft) : ''
					paddingRight ? layout.paddingRight(paddingRight) : ''
					paddingTop ? layout.paddingTop(paddingTop) : ''
					paddingBottom ? layout.paddingBottom(paddingBottom) : ''
					rectPadding ? layout.padding(rectPadding) : ''
					/* paddingTop, paddingRight, Left and Bottom available */
					// treemapDice,treemapSlice,treemapSquarify,treemapResquarify
					switch (tile) {
						case 'treemapBinary':
							layout.tile(d3.treemapBinary)
							break
						case 'treemapDice':
							layout.tile(d3.treemapDice)
							break
						case 'treemapSlice':
							layout.tile(d3.treemapSlice)
							break
						case 'treemapResquarify':
							layout.tile(d3.treemapResquarify)
							break
						default:
							layout.tile(d3.treemapSquarify.ratio(ratio))
					}
				}
				if (type === 'partition') {
					layout.padding(this.props.partitionPadding)
				}
				root.sum(d => d.value)
				layout(root)
				let data = root.descendants()
				return (
					<div class={styles.container}>
						<Tooltip {...tooltip} />
						<svg viewBox="0 0 405 310" ref={el => this.treemap = el} width={width - padding.left - padding.right} height={height - padding.top - padding.bottom}>
							<g transform="translate(1,0)">
								{data && data.map((d, index) => {
									return (
										<g
											onMouseOut={interactive ? this.handleMouseOut : null}
											onMouseMove={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											onMouseOver={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											key={index + 1} class={styles.node} transform={`translate(${[d.x0, d.y0]})`}>
											<rect
												width={d.x1 - d.x0}
												height={d.y1 - d.y0}
												stroke="#2f2f2f"
												fill={activeIdx === index ? hoverColor : backgroundColor} />
											<text
												dx="3"
												dy="15"
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
			case 'pack': {
				let packLayout = d3.pack()
				packLayout.size([width - padding.left - padding.right, height - padding.bottom - padding.top - 20])
				packLayout.padding(this.props.packPadding)

				root.sum(d => d.value)
				packLayout(root)
				let packData = root.descendants()

				return (
					<div class={styles.container}>
						<Tooltip {...tooltip} />
						<svg ref={el => this.pack = el} width={width} height={height}>
							<g transform="translate(0,10)">
								{packData && packData.map((d, index) => {
									return (
										<g
											onMouseOut={interactive ? this.handleMouseOut : null}
											onMouseMove={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											onMouseOver={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											key={index + 1}
											class={styles.node}
											transform={`translate(${[d.x, d.y]})`}>
											<circle
												r={d.r}
												fill={activeIdx === index ? hoverColor : backgroundColor}
												stroke="#2f2f2f"
											/>
											<text
												dy="4"
												dx="-10"
												fill={activeIdx === index ? "#fff" : "#000"}>
												{d.children === undefined ? d.data.name : ''}
											</text>
										</g>
									)
								})}
							</g>
						</svg>
					</div>
				)
			}
			case 'sunburst': {
				let { radius, angle,dataKey,padding } = this.props

				let color = d3.scaleOrdinal(d3.schemeCategory20)
				// 如果没有指定，则默认是长度或者宽度的一半
				radius = radius?radius:Math.min(width, height) / 2

				let sunburstLayout = d3.partition()
				sunburstLayout.size([2 * Math.PI*angle, radius * radius])
				let arc = d3.arc()
					.startAngle(d => d.x0)
					.endAngle(d => d.x1)
					.innerRadius(d => Math.sqrt(d.y0))
					.outerRadius(d => Math.sqrt(d.y1))

				root.sum(d => d[dataKey])

				sunburstLayout(root)
				let sunburstData = root.descendants()
				let {top,right,bottom,left} = padding
				let contentArr = content.indexOf(',') > -1?content.split(','):[]
				return (
					<div class={styles.container} style={{padding:`${top}px ${right}px ${bottom}px ${left}px`}}>
						<Tooltip {...tooltip} />
						<ul class={styles.showText}>
							{contentArr.length >0?contentArr.map((d,index)=>
								<li key={index}>{d}</li>
							):<li>{content}</li>}
						</ul>
						<svg ref={el => this.pack = el} width={width} height={height}>
							<g class={styles.node} transform={`translate(${width / 2}, ${height * .52} )`}>
								{sunburstData && sunburstData.map((d, index) => {
									return (
										<g
											onMouseOut={interactive ? this.handleMouseOut : null}
											onMouseMove={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											onMouseOver={interactive ? (e) => this.handleMouseOver(e, d, index) : null}
											onClick={interactive ? (e) => this.handleClick(e, d, index) : null}
											key={index + 1}>
											<path
												style={{display:d.depth ===0?'none':'block',opacity:sunburstHighlight && activeIdx !== index ?0.3:1}}
												d={arc(d)}
												fill={color((d.children ? d : d.parent).data.name)}
												fill-rule="evenodd"
												stroke="#fff"
											/>
											{false &&<text
												transform={`translate(${arc.centroid(d)}) rotate(${this.computeTextRotation(d)})`}
												dy=".5em"
												dx="-8"
												fill={activeIdx === index ? "#fff" : "#000"}>
												{d.parent ? d.data.name : ''}
											</text>}
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
