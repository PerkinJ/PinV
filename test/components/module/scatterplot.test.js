import {h} from 'preact'
import {deep} from 'preact-render-spy'
import {ScatterPlot} from '../../../src'
import { randomData } from '../../utils/datagen'

it('renders same amount of circles with data', () => {
	const data = randomData()

	let scatterplot = deep(<ScatterPlot
		XAxis="key"
		YAxis="value"
		data={data}
		width={500}
		height={300}
		circleStroke="#000"
		padding={{ top: 32, bottom: 32, left: 30, right: 20 }} />)
	expect(scatterplot.find('circle').length).toBe(data.length)

})

