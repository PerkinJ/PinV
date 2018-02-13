import { h, Component } from 'preact'
import * as d3 from 'd3'
import styles from './index.css'
import Tooltip from '../../common/Tooltip'
class StreamGraph extends Component {
	constructor(props) {
		super(props)
		this.state={
			activeIdx:-1,
			tooltip:{}
		}
	}
	static defaultProps = {
		width: 660,
		height: 600,
		padding: { top: 20, right: 20, bottom: 30, left: 50 },
		colorRange:[],
		interactive:true,
		labels : []
	}
	componentDidMount() {

	}
	handleMouseOver = (e,value,index) =>{
		this.setState({
			activeIdx:index,
			tooltip: {
				x: e.clientX + 20,
				y: e.clientY,
				child: this.props.labels[index],
				show: true
			}
		})
	}
	handleMouseOut = ()=>{
		this.setState({
			activeIndex: -1,
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			}
		})
	}
	render({width,height,padding,data,colorRange,interactive,labels},{activeIdx,tooltip}) {
		// generate stack
		let stack = d3.stack().keys(d3.range(data[0].length)).offset(d3.stackOffsetWiggle),
			layers = stack(data)
		let x = d3.scaleLinear()
			.domain([0, layers[0].length-1])
			.range([0, width])

		let y = d3.scaleLinear()
			.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
			.range([height, 0])
		// color choice
		let z = colorRange.length > 0 ?d3.scaleOrdinal().range(colorRange):d3.interpolateRainbow

		let area = d3.area()
			.x((d, i) => x(i))
			.y0((d) => y(d[0]))
			.y1(d => y(d[1]))

		function stackMax(layer) {
			return d3.max(layer, (d) => d[1])
		}

		function stackMin(layer) {
			return d3.min(layer, (d) => d[0])
		}
		return (
			<div>
				{labels.length > 0&& <Tooltip {...tooltip} />}
				<svg width={width} height={height} ref={el => this.StreamGraph = el} >
					<g class={styles.path} transform={`translate(${padding.left},${padding.top})`}>
						{!!layers&&layers.map((d,index)=>(
							<path
								style={{opacity:activeIdx ===index ?1:0.85}}
								key={index}
								stroke-width="1px"
								stroke={activeIdx ===index ?"#fff":''}
								d={area(d)}
								fill={z((index+1)/layers.length)}
								onMouseOver={interactive ?(e) => this.handleMouseOver(e, layers,index):null}
								onMouseMove={interactive?(e) => this.handleMouseOver(e, layers,index):null}
								onMouseOut={interactive?this.handleMouseOut:null}
							/>
						))}
					</g>
				</svg>
			</div>
		)
	}
}

export default StreamGraph
