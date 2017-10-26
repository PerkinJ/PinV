import {h,Component} from 'preact'
import styles from './Button.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class Button extends Component{
    static defaultProps = {
        size: 'default',
        htmlType: 'button',
        onClick: () => null
      }
    handleClick = e => {
        let { disabled, onClick } = this.props
        if (!disabled && onClick) {
          onClick()
        }
      }
      render() {
        const {
          type,
          htmlType,
          size,
          className,
          disabled,
          children,
          style
        } = this.props
        const prefix = 'pinvButton'
        let classes = cx(
          [
            prefix,
            `${prefix}${size}`,
            `${prefix}${type}`,
            {
              [`${prefix}disabled`]: disabled
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