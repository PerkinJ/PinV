import {h} from 'preact'
import {deep} from 'preact-render-spy'
import {SunburstLayout} from '../../../src'
import flareData from '../../flare.json'
it('renders sunburst with data', () => {

	let sunburst = deep(<SunburstLayout
		data={flareData}
		width="600"
		height="660"
		padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
		dataKey="size"
		nameKey="name"
		interactive={true}
		backgroundColor="rgba(0,105,92,0.8)"
		hoverColor="rgba(38,166,154,0.2)"
		angle={1}
	/>)

	expect(sunburst.find('path').length).toBe(252)

})

