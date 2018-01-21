import {h} from 'preact'
import {deep} from 'preact-render-spy'
import {LineChart} from '../../../src'

it('linechart components', () => {
	let lineData = [
		{
			name: 'series1',
			values: [{ x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 }],
			strokeWidth: 3,
			strokeDashArray: "5,5"
		},
		{
			name: 'series2',
			values: [{ x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 }]
		},
		{
			name: 'series3',
			values: [{ x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 }]
		}
	]

	let linechart = deep(<LineChart
		legend={true}
		data={lineData}
		width='80%'
		height={400}
		sideOffset={100}
		legendPosition="top"
		viewBoxObject={{
			x: 0,
			y: 0,
			width: 550,
			height: 400
		}}
		title="折线图"
		yAxisLabel="Altitude"
		xAxisLabel="横坐标"
		gridHorizontal={true}
	/>)
	expect(linechart.find('circle').length).toBe(19)
	// linechart.find('[onMouseOver]').simulate('mouseover')
	// expect(linechart.find('circle').length).toBe(1)

})

