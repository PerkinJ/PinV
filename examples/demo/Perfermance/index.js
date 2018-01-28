import { h, Component } from 'preact'
import { SunburstLayout } from 'pinv'

// let scatterData = [
// 	{
// 		name: 'series1',
// 		values: [{ x: 10, y: 8.04 }, { x: 8, y: 6.95 }, { x: 13, y: 7.58 }, { x: 11, y: 8.33 }, { x: 14.0, y: 9.96 }, { x: 6, y: 7.24 }, { x: 4.0, y: 4.26 }, { x: 12.0, y: 10.84 }, { x: 7, y: 4.82 }, { x: 5, y: 5.68 }]
// 	}
// ]
// let streamData1 = [
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 49, 67, 16, 0, 19, 19, 0, 0, 1, 10, 5, 6, 1, 1, 0, 25, 0, 0, 0],
// 	[0, 6, 3, 34, 0, 16, 1, 0, 0, 1, 6, 0, 1, 56, 0, 2, 0, 2, 0, 0],
// 	[0, 8, 13, 15, 0, 12, 23, 0, 0, 1, 0, 1, 0, 0, 6, 0, 0, 1, 0, 1],
// 	[0, 9, 28, 0, 91, 6, 1, 0, 0, 0, 7, 18, 0, 9, 16, 0, 1, 0, 0, 0],
// 	[0, 3, 42, 36, 21, 0, 1, 0, 0, 0, 0, 16, 30, 1, 4, 62, 55, 1, 0, 0],
// 	[0, 7, 13, 12, 64, 5, 0, 0, 0, 8, 17, 3, 72, 1, 1, 53, 1, 0, 0, 0],
// 	[1, 14, 13, 7, 8, 8, 7, 0, 1, 1, 14, 6, 44, 8, 7, 17, 21, 1, 0, 0],
// 	[0, 6, 14, 2, 14, 1, 0, 0, 0, 0, 2, 2, 7, 15, 6, 3, 0, 0, 0, 0],
// 	[0, 9, 11, 3, 0, 8, 0, 0, 14, 2, 0, 1, 1, 1, 7, 13, 2, 1, 0, 0],
// 	[0, 7, 5, 10, 8, 21, 0, 0, 130, 1, 2, 18, 6, 1, 5, 1, 4, 1, 0, 7],
// 	[0, 2, 15, 1, 5, 5, 0, 0, 6, 0, 0, 0, 4, 1, 3, 1, 17, 0, 0, 9],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[6, 27, 26, 1, 0, 11, 1, 0, 0, 0, 1, 1, 2, 0, 0, 9, 1, 0, 0, 0],
// 	[31, 81, 11, 6, 11, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 3, 14, 0, 0, 12],
// 	[19, 53, 6, 20, 0, 4, 37, 0, 30, 86, 43, 7, 5, 7, 17, 19, 2, 0, 0, 5],
// 	[0, 22, 14, 6, 10, 24, 18, 0, 13, 21, 5, 2, 13, 35, 7, 1, 8, 0, 0, 1],
// 	[0, 56, 5, 0, 0, 0, 0, 0, 7, 24, 0, 17, 7, 0, 0, 3, 0, 0, 0, 8],
// 	[18, 29, 3, 6, 11, 0, 15, 0, 12, 42, 37, 0, 3, 3, 13, 8, 0, 0, 0, 1],
// 	[32, 39, 37, 3, 33, 21, 6, 0, 4, 17, 0, 11, 8, 2, 3, 0, 23, 0, 0, 17],
// 	[72, 15, 28, 0, 0, 0, 0, 0, 1, 3, 0, 35, 0, 9, 17, 1, 9, 1, 0, 8],
// 	[11, 15, 4, 2, 0, 18, 10, 0, 20, 3, 0, 0, 2, 0, 0, 2, 2, 30, 0, 0],
// 	[14, 29, 19, 3, 2, 17, 13, 0, 7, 12, 2, 0, 6, 0, 0, 1, 1, 34, 0, 1],
// 	[1, 1, 7, 6, 1, 1, 15, 1, 1, 2, 1, 3, 1, 1, 9, 1, 1, 25, 1, 72]
// ]
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
export default class Perfermance extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentDidMount() {
		console.log('111')
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
			<div style={{ marginTop: 50 }}>
				{/* <StreamGraph
					padding={{ top: 0, right: 0, bottom: 30, left: 20 }}
					width="600"
					height="400"
					data={streamData1}
					labels={[
						'The Sea and Cake',
						'Andrew Bird',
						'Laura Veirs',
						'Brian Eno',
						'Christopher Willits',
						'Wilco',
						'Edgar Meyer',
						'B\xc3\xa9la Fleck',
						'Fleet Foxes',
						'Kings of Convenience',
						'Brett Dennen',
						'Psapp',
						'The Bad Plus',
						'Feist',
						'Battles',
						'Avishai Cohen',
						'Rachael Yamagata',
						'Norah Jones',
						'B\xc3\xa9la Fleck and the Flecktones',
						'Joshua Redman'
					]}
				/> */}
				<SunburstLayout
					data={sunburstData}
					onClick={this.handleClick}
					width="400"
					height="460"
					padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
					dataKey="value"
					nameKey="name"
					interactive={true}
					backgroundColor="rgba(0,105,92,0.8)"
					hoverColor="rgba(38,166,154,0.2)"
					angle={1}
				/>
			</div>

		)
	}
}

