import {h,Component} from 'preact'
import './Button.less'
import ClassNames from 'classnames'

class Button extends Component{
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
        const prefix = 'pinv-button'
        let classes = ClassNames(
          [
            prefix,
            `${prefix}-${size}`,
            `${prefix}-${type}`,
            {
              [`${prefix}-disabled`]: disabled
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