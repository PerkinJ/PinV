import { h } from 'preact'
import { storiesOf, action } from '@kadira/storybook'
import  Button  from '../src/components/insfrastructure/Button' // preact component
storiesOf('Button', module)
	.add('primary', () => {
		return (<Button type="primary">Randomize Data</Button>)
	})
	.add('default', () => {
		return (<Button type="default">Randomize Data</Button>)
	})
