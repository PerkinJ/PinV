import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style.less'

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>PinV</h1>
				<nav>
					<Link href="/">组件库</Link>
					<Link href="/profile">Me</Link>
					<Link href="/profile/john">John</Link>
				</nav>
			</header>
		);
	}
}
