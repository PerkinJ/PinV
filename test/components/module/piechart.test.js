import { h } from 'preact'
import { deep } from 'preact-render-spy'
import { PieChart } from '../../../src'

it('piechart components', () => {
	const phoneData = [{ name: 'apple', sales: 1000 + Math.floor(Math.random() * 1000) },
		{ name: 'huawei', sales: 800 + Math.floor(Math.random() * 1000) },
		{ name: 'sansung', sales: 1200 + Math.floor(Math.random() * 1000) },
		{ name: 'xiaomi', sales: 700 + Math.floor(Math.random() * 1000) },
		{ name: 'oppo', sales: 800 + Math.floor(Math.random() * 1000) },
		{ name: 'vivo', sales: 500 + Math.floor(Math.random() * 1000) },
		{ name: 'others', sales: 1300 + Math.floor(Math.random() * 1000) }]

	let piechart = deep(<PieChart
		data={phoneData}
		width="500"
		height="500"
		innerRadius={0}
		outerRadius={180}
		textColor="#000"
		dataKey="sales"
		nameKey="name"
		padAngle={0}
		cornerRadius={0}
		startAngle={0}
		endAngle={1}
		unit="万台"
	/>)
	expect(piechart.find('path').length).toBe(phoneData.length)
	expect(piechart.find('Tooltip').text().length).toBe(0)
	piechart.find('[onMouseOut]').simulate('mouseout')
	expect(piechart.find('Tooltip').text().length).toBe(0)
})

