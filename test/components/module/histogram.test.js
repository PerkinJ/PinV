import {h} from 'preact'
import {deep} from 'preact-render-spy'
import {Histogram} from '../../../src'
import { randomData } from '../../utils/datagen'

it('renders Histogram with data', () => {
	const data = randomData()

	let histogram = deep(<Histogram
		hidden={true}
		XAxis="key"
		YAxis="value"
		data={data}
		width={500}
		height={300}
		padding={{ top: 32, bottom: 32, left: 30, right: 20 }}
	/>)
	// 交互阴影区块也是rect
	expect(histogram.find('rect').length).toBe(data.length * 2)
})

