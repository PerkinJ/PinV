import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'
import Tooltip from '../../basic/Tooltip'

export default class ChordDiagram extends Component {
	static defaultProps = {
		width: 500,
		height: 500,
		arcWidth: 10,	//外弧的宽度，最大不超过宽度/高度的1/3
		padding: 40,		// padding，最大不超过宽度/高度的1/3
		padAngle: 0.03,   // 弦的间隔，[0,0.1]
		interactive:true
	}
	constructor(props) {
		super(props)
		this.state = {
			chords: [],
			groups: [],
			activeIndex: -1,  // 默认为-1，表示全部显示
			content: ''
		}
	}
	renderData = () => {
		const { padAngle,data } = this.props
		let chord = d3.chord()
			.padAngle(padAngle > 0.1 ? 0.1 : padAngle < 0 ? 0 : padAngle)
			.sortSubgroups(d3.descending)

		let chordData = chord(data)
		// 生成数据
		this.setState({ chords: chordData })
		// 生出弧
		this.setState({ groups: chordData.groups })
	}
	componentDidMount() {
		this.renderData()
	}
	handleText = (d, outerRadius) => {
		// 为绑定的数据添加变量，设置弧的中心角度
		d.angle = (d.startAngle + d.endAngle) / 2
		// 先旋转d.angle度
		let result = `rotate(${d.angle * 180 / Math.PI})`
		// 平移到外半径之外
		result += `translate(0,${-1.0 * outerRadius - 15})`
		// 对位于弦图下方的文字，翻转180度，为了防止是倒着的
		if (d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4)
			result += `rotate(180)`
		return result
	}
	// 处理鼠标移到弧上
	handleArcMouseOver = (e, d) => {
		const {category,data} = this.props
		let obj = {}
		obj.key = `${category[d.index]}总量`
		obj.value = d.value
		let contentArr = []
		contentArr.push(obj)

		data[d.index].forEach((d, index) => {
			let obj = {}
			obj.key = category[index]
			obj.value = d
			contentArr.push(obj)
		})

		this.setState({
			activeIndex: d.index,
			contentArr,
			tooltipStyle: {
				left: e.clientX + 20,
				top: e.clientY,
				opacity: 0.9
			}
		})
	}

	// 处理鼠标移到任意弦上
	handleChordMouseOver = (e, d) => {
		const {category} = this.props
		e = e || window.event
		// 比较source跟target的value值大小，从而设置activeIndex
		let activeIndex = -1, contentArr = []
		if (d.source.value >= d.target.value) {
			activeIndex = d.source.index
		} else {
			activeIndex = d.target.index
		}
		let key1 = `${category[d.source.index]}-${category[d.source.subindex]}`,
			value1 = ` ${d.target.value}`,
			key2 = `${category[d.target.index]}-${category[d.target.subindex]}`,
			value2 = ` ${d.source.value}`

		contentArr.push({ key: key1, value: value1 }, { key: key2, value: value2 })
		this.setState({
			activeIndex,
			contentArr,
			tooltipStyle: {
				left: e.clientX + 20,
				top: e.clientY,
				opacity: 0.9
			}
		})
	}

	handleMouseOut = () => {
		this.setState({
			activeIndex: -1,
			tooltipStyle: {
				opacity: 0
			}
		})
	}
	render({ width, height, arcWidth, padding, interactive,category }, { chords, groups, activeIndex, content, tooltipStyle, contentArr }) {
		let outerRadius = Math.min(width, height) * 0.5 - (padding > Math.min(width, height) / 3 ? Math.min(width, height) / 3 : padding < 0 ? 0 : padding),
			innerRadius = outerRadius - (arcWidth > Math.min(width, height) / 3 ? Math.min(width, height) / 3 : arcWidth < 0 ? 0 : arcWidth)
		let ribbon = d3.ribbon().radius(innerRadius)
		let arc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
		let color = d3.scaleOrdinal().domain(d3.range(5)).range(["#000000", "#FFDD89", "#957244", "#F26223", "#dadada"])
		interactive = category?interactive:false
		return (
			<div>
				<Tooltip
					contentArr={contentArr}
					content={content}
					tooltipStyle={tooltipStyle}
				/>
				<svg ref={el => this.chordDiagram = el} width={width} height={height} >
					<g transform={`translate(${width / 2},${height / 2})`}>
						<g class={styles.groups}>
							{groups.map((d, index) =>
								<g key={index} class="outerPath">
									<path d={arc(d)}
										onMouseOver={interactive?(e) => this.handleArcMouseOver(e, d):null}
										onMouseMove={interactive?(e) => this.handleArcMouseOver(e, d):null}
										onMouseOut={interactive?this.handleMouseOut:null}
										fill={color(d.index)}
										stroke={d3.rgb(color(d.index)).darker()}
									/>
									<text dy=".35em"
										transform={this.handleText(d, outerRadius)}
									>
										{category&&category[d.index]}
									</text>
								</g>
							)}
						</g>
						<g class={styles.ribbons}>
							{chords.map((d, index) =>
								<g key={index}>
									<path d={ribbon(d)}
										onMouseOver={interactive?(e) => this.handleChordMouseOver(e, d):null}
										onMouseMove={interactive?(e) => this.handleChordMouseOver(e, d):null}
										onMouseOut={interactive?this.handleMouseOut:null}
										style={{ opacity: activeIndex !== -1 && d.source.index !== activeIndex && d.target.index !== activeIndex ? 0 : 1 }}
										fill={color(d.target.index)}
										stroke={d3.rgb(color(d.target.index)).darker()}
									/>
								</g>
							)}
						</g>
					</g>
				</svg>
			</div>
		)
	}
}
