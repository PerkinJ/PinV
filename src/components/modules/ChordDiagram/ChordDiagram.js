import { h, Component } from 'preact'
// import { legendColor } from 'd3-svg-legend'
import * as d3 from 'd3'
import styles from './index.less'
// import Tooltip from '../../basic/Tooltip'
export default class ChordDiagram extends Component {
	static defaultProps = {
		width: 700,
		height: 700,
		arcWidth: 10,	//外弧的宽度，最大不超过宽度/高度的1/3
		padding: 10,		// padding，最大不超过宽度/高度的1/3
		padAngle: 0.03,   // 弦的间隔，[0,0.1]
		interactive: true
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	// 处理鼠标移到弧上
	handleArcMouseOver = (e, d) => {
		const { category, data } = this.props
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
		const { category } = this.props
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
	render({ width, height,padAngle }, {  }) {
		let outerRadius = width / 2,
			innerRadius = outerRadius - 150

		let color = d3.scaleOrdinal(d3.schemeCategory20)

		let chord = d3.chord()
			.padAngle(padAngle)
			.sortSubgroups(d3.descending)
			.sortChords(d3.descending)

		let ribbon = d3.ribbon().radius(innerRadius)

		let arc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(innerRadius + 20)
		let imports = this.props.data

		let indexByName = d3.map(),
			nameByIndex = d3.map(),
			matrix = [],
			n = 0

		// Returns the Flare package name for the given class name.
		function name(name) {
			return name.substring(0, name.lastIndexOf(".")).substring(6)
		}
		// Compute a unique index for each package name.
		imports.forEach(d => {
			if (!indexByName.has(d = name(d.name))) {
				nameByIndex.set(n, d)
				indexByName.set(d, n++)
			}
		})

		// Construct a square matrix counting package imports.
		imports.forEach(d => {
			let source = indexByName.get(name(d.name)),
				row = matrix[source]
			if (!row) {
				row = matrix[source] = []
				for (let i = -1; ++i < n;) row[i] = 0
			}
			d.imports.forEach(d => row[indexByName.get(name(d))]++)
		})
		let chordData = chord(matrix)
		return (
			<div ref={el => this.chordDiagram = el}>
				<svg ref={el => this.chordDiagram = el} width={width} height={height} >
					<g transform={`translate(${outerRadius},${outerRadius})`}>
						<g class={styles.groups}>
							{chordData.groups.map((d, index) => {
								d.angle = (d.startAngle + d.endAngle) / 2
								return (
									<g key={index}>
										<path d={arc(d)}
											// onMouseOver={interactive ? (e) => this.handleArcMouseOver(e, d) : null}
											// onMouseMove={interactive ? (e) => this.handleArcMouseOver(e, d) : null}
											// onMouseOut={interactive ? this.handleMouseOut : null}
											fill={color(d.index)}
											stroke={d3.rgb(color(d.index)).darker()}
										/>
										<text
											transform={"rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
												+ "translate(" + (innerRadius + 26) + ")"
												+ (d.angle > Math.PI ? "rotate(180)" : "")}
											dy=".2em"
											text-anchor={d.angle > Math.PI ? "end" : null}
										>
											{nameByIndex.get(d.index)}
										</text>
									</g>
								)
							}
							)}
						</g>
						<g class={styles.ribbons} >
							{chordData.map((d, index) =>
								<g key={index}>
									<path
										// onMouseOver={interactive ? (e) => this.handleChordMouseOver(e, d) : null}
										// onMouseMove={interactive ? (e) => this.handleChordMouseOver(e, d) : null}
										// onMouseOut={interactive ? this.handleMouseOut : null}
										d={ribbon(d)}
										// style={{ opacity: activeIndex !== -1 && d.source.index !== activeIndex && d.target.index !== activeIndex ? 0 : 1 }}
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
