import {h} from 'preact'
import {shallow} from 'preact-render-spy'
import {LineChart} from '../../../src'
import { randomData } from '../../utils/datagen'

it('linechart components', () => {
	const data = randomData()

	let linechart = shallow(<LineChart
		XAxis="key"
		YAxis="value"
		data={data}
		width={500}
		height={300}
		shape="curveCardinal"
		padding={{ top: 32, bottom: 32, left: 30, right: 20 }} />)
	expect(linechart.find('line').length).toBe(2)
	linechart.find('[onMouseOver]').simulate('mouseover')
	expect(linechart.find('circle').length).toBe(1)

})

