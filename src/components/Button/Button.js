import { h, Component } from 'preact'
import styles from './Button.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

const prefix = 'pinvButton'
class Button extends Component {
	static defaultProps = {
		size: 'default',
		htmlType: 'button',
		type:'default',
		onClick: () => null
	}
	handleClick = () => {
		let { disabled, onClick } = this.props
		if (!disabled && onClick) {
			onClick()
		}
	}
	render() {
		const { type,
			htmlType,
			size,
			className,
			disabled,
			children,
			style } = this.props
		let classes = cx(
			[
				prefix,
				`${prefix}_${size}`,
				`${prefix}_${type}`,
				{
					[`${prefix}_disabled`]: disabled
				}
			],
			className
		)
		return (
			<button
				className={classes}
				type={htmlType}
				onClick={this.handleClick}
				style={style}
			>
				{children}
			</button>
		)
	}
}
export default Button
