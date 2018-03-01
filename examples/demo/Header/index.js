import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style.less'

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<div class={style.box}>
					<h1>PinV</h1>
					<nav>
						<Link href="/">组件库</Link>
						<Link href="/examples">Examples</Link>
						{/* <Link href="/perfermance">Perfermance</Link> */}
						<Link href="" onClick={()=>window.open('https://github.com/PerkinJ/PinV')}>Github</Link>
					</nav>
				</div>
			</header>
		)
	}
}
