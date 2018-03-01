import { h, Component } from 'preact'
import { ChordDiagram,BarChart } from 'pinv'
import readmeData from '../readme.json'

const sunburstData = {
	name: "flare",
	children: [{
		name: 'Grandpa',
		children: [{
			name: 'Uncle Leo',
			value: 15,
			children: [{
				name: 'Cousin Jack',
				value: 2
			}, {
				name: 'Cousin Mary',
				value: 5,
				children: [{
					name: 'Jackson',
					value: 2
				}]
			}, {
				name: 'Cousin Ben',
				value: 4
			}]
		}, {
			name: 'Father',
			value: 10,
			children: [{
				name: 'Me',
				value: 5
			}, {
				name: 'Brother Peter',
				value: 1
			}]
		}]
	}, {
		name: 'Nancy',
		children: [{
			name: 'Uncle Nike',
			children: [{
				name: 'Cousin Betty',
				value: 1
			}, {
				name: 'Cousin Jenny',
				value: 2
			}]
		}]
	}]
}
let data = [
	{
		letter: 'A',
		frequency: 0.08167
	},
	{
		letter: 'B',
		frequency: 0.01492
	},
	{
		letter: 'C',
		frequency: 0.02780
	},
	{
		letter: 'D',
		frequency: 0.04253
	},
	{
		letter: 'E',
		frequency: 0.12702
	},
	{
		letter: 'F',
		frequency: 0.02288
	}
]
export default class Perfermance extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentDidMount() {
	}
	render() {
		return (
			// <ScatterChart
			// 	style={{marginTop:30}}
			// 	data={scatterData}
			// 	width={500}
			// 	height={400}

			// 	domain={{ x: [0,], y: [0,12] }}
			// 	title="Scatter Chart"
			// />
			<div>
				<BarChart data={data}/>
				{/* <ChordDiagram
					data={readmeData}
				/> */}
			</div>

		)
	}
}

