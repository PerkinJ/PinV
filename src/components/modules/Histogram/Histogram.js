import { h, Component } from 'preact'
import * as d3 from 'd3'
import Axis from '../../basic/Axis'
import styles from './index.less'
import Tooltip from '../../basic/Tooltip'
import {addEvent,removeEvent} from '../../../utils/utils'
class Histogram extends Component {
	static defaultProps = {
		width: 600,
		height: 400,
		padding: { top: 32, bottom: 32, left: 20, right: 20 },
		// left: 40,
		tickSize: 5,
		tickFormat: '',
		stroke: '#673ab7',
		interactive: true
	}
	constructor(props) {
		super(props)
		this.state = {
			content: 'test',
			tooltipStyle: { left: 0, top: 0 },
			activeIdx:null
		}
	}
	handleMouseOver = (e,value,index) => {
		const { XAxis, YAxis } = this.props
		e = e || window.event
		this.setState({
			content: `${XAxis}  ${value[XAxis]} : ${YAxis}  ${value[YAxis]}`,
			tooltipStyle: {
				left: e.pageX,
				top: e.offsetY,
				opacity: 0.9,
				display:'block'
			},
			activeIdx:index
		})
	}
	handleMouseOut = () => {
		this.setState({
			tooltipStyle: {
				opacity: 0
			},
			activeIdx:'0'
		})
	}
	componentDidMount(){
		addEvent(this.rectContainer,'mouseleave',this.handleMouseOut)
	}
	componentWillUnmount(){
		removeEvent(this.rectContainer,'mouseleave',this.handleMouseOut)
	}
	render({ data, padding, width, height, XAxis, YAxis, tickSize, tickFormat, stroke, interactive }, { content, tooltipStyle,activeIdx }) {
		let dWidth = width - padding.left - padding.right - data.length / 2,
			dHeight = height - padding.top - padding.bottom
		let xDomain = d3.max(data, (d) => d[XAxis]),
			yDomain = d3.max(data, (d) => d[YAxis])
		let scaleX = d3.scaleLinear()
			.domain([0, xDomain])
			.range([0, dWidth])
		let scaleY = d3.scaleLinear()
			.domain([0, yDomain])
			.range([dHeight, padding.bottom])
		let color = d3.scaleOrdinal(d3.schemeCategory10)

		return <div class={styles.container}>
			<Tooltip
				content={content}
				tooltipStyle={tooltipStyle}
			/>
			<svg width={width + padding.left + padding.right} height={height + padding.top + padding.bottom}>
				<Axis
					type="x"
					dataKey={XAxis}
					data={data}
					length={dWidth}
					stroke={stroke}
					orient="bottom"
					class={styles.axis}
					textAnchor="middle"
					transform={`translate(${padding.left},${dHeight + padding.top})`} />
				<Axis
					type='y'
					dataKey={YAxis}
					length={dHeight}
					data={data}
					stroke={stroke}
					orient="left"
					class={styles.axis}
					tickSize={tickSize}
					tickFormat={tickFormat}
					textAnchor="end"
					transform={`translate(${padding.left} ,${padding.top})`} />
				<g class={styles.graph} ref={el => this.rectContainer = el} >
					{data.map((d, index) => {
						let width = dWidth / data.length
						// 	这里为了交互效果，增加了一个蒙层rect
						return (
							<g>
								<rect
									key={index + 1}
									ref={el => this.rect = el}
									class={styles.rect}
									width={width}
									height={dHeight - scaleY(d.value)}
									transform={`translate(${scaleX(d.key) + padding.left},${scaleY(d.value) + padding.top})`}
									fill={color(d.value)} />
								<rect
									key={index + 1}		//这里主要为了让activeIdx有一个默认的0为初始值
									onMouseOver={interactive?(e) => this.handleMouseOver(e,d,index):null}
									onMouseMove={interactive?(e) => this.handleMouseOver(e,d,index):null}
									width={width+2}
									height={dHeight}
									fill="#000"
									style={{opacity:activeIdx === index?'0.15':'0'}}
									transform={`translate(${scaleX(d.key) + padding.left -1},${padding.top})`} />
							</g>
						)
					})}

				</g>
			</svg>
		</div>
	}
}
export default Histogram
