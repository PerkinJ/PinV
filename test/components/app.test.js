// import { h, render } from 'preact'
// import { route } from 'preact-router'
// import { expect } from 'chai'

// import App from '../../src/demo/app'

describe('App', () => {
	let scratch

	beforeAll( () => {
		scratch = document.createElement('div')
		let body = document.body || document.documentElement
		body.appendChild(scratch)
	})

	beforeEach( () => {
		scratch.innerHTML = ''
	})

	afterAll( () => {
		scratch.parentNode.removeChild(scratch)
		scratch = null
	})


	describe('routing', () => {
		it('should render the homepage', () => {
			// render(<App />, scratch)

			// expect(scratch.innerHTML).to.contain('组件')
		})


	})
})
