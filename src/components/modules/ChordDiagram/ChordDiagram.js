import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'

let continent = ['亚洲','欧洲','非洲','美洲','大洋洲']

let population = [
	[9000, 870, 3000, 1000, 5200],
	[3400, 8000, 2300, 4922, 374],
	[2000, 2000, 7700, 4881, 1050],
	[3000, 8012, 5531, 500, 400],
	[3540, 4310, 1500, 1900, 300]
]
export default class ChordDiagram extends Component {
	static defaultProps = {
		width: 500,
		height: 500,
		arcWidth: 10,	//外弧的宽度，最大不超过宽度/高度的1/3
		padding: 40,		// padding，最大不超过宽度/高度的1/3
		padAngle: 0.03   // 弦的间隔，[0,0.1]
	}
	constructor(props) {
		super(props)
		this.state = {
			chords: [],
			groups: []
		}
	}
	renderData = ()=>{
		const { padAngle } = this.props
		let chord = d3.chord()
			.padAngle(padAngle > 0.1 ? 0.1 : padAngle < 0 ? 0 : padAngle)
			.sortSubgroups(d3.descending)

		let chordData = chord(population)

		// 生成数据
		this.setState({ chords:chordData })
		// 生出弧
		this.setState({ groups: chordData.groups })
	}
	componentDidMount() {
		this.renderData()
	}
	handleText = (d,outerRadius) =>{
		// 为绑定的数据添加变量，设置弧的中心角度
		d.angle = (d.startAngle + d.endAngle) /2
		// 先旋转d.angle度
		let result = `rotate(${d.angle * 180 / Math.PI })`
		// 平移到外半径之外
		result += `translate(0,${-1.0* outerRadius - 15})`
		// 对位于弦图下方的文字，翻转180度，为了防止是倒着的
		if (d.angle > Math.PI * 3/4 && d.angle < Math.PI * 5/4)
			result += `rotate(180)`
		return result
	}
	render({ width, height, arcWidth, padding }, { chords, groups }) {
		let outerRadius = Math.min(width, height) * 0.5 - (padding > Math.min(width, height) / 3 ? Math.min(width, height) / 3 : padding < 0 ? 0 : padding),
			innerRadius = outerRadius - (arcWidth > Math.min(width, height) / 3 ? Math.min(width, height) / 3 : arcWidth < 0 ? 0 : arcWidth)
		let ribbon = d3.ribbon().radius(innerRadius)
		let arc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
		let color = d3.scaleOrdinal().domain(d3.range(5)).range(["#000000", "#FFDD89", "#957244", "#F26223", "#dadada"])
		return (
			<div>
				<svg  width={width} height={height} >
					<g transform={`translate(${width / 2},${height / 2})`}>
						<g class={styles.groups}>
							{groups.map((d, index) =>
								<g key={index}>
									<path d={arc(d)}
										fill={color(d.index)}
										stroke={d3.rgb(color(d.index)).darker()}
									/>
									<text dy=".35em"
										  transform={this.handleText(d,outerRadius)}
									>
										{continent[d.index]}
									</text>
								</g>
							)}
						</g>
						<g class={styles.ribbons}>
							{chords.map((d, index) =>
								<g key={index}>
									<path d={ribbon(d)}
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
