import { h } from 'preact'
import { expect } from 'chai'

import Header from '../../../src/demo/Header'

describe('mode/Header', () => {

	it('should show the correct navigation links', () => {
		const header = <Header/>
		expect(header).to.contain(<a href='/'>组件库</a>)
		expect(header).to.contain(<a href='/examples'>Examples</a>)
		expect(header).to.contain(<a href='/profile/john'>John</a>)
	})

})
