import {h,Component} from 'preact'
import styles from './style.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

export default class Input extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputStyles: null            
        }
    }
    static defaultProps = {
        disabled: false,
        prefix: 'pinv'
    }
    render(){
        const props = this.props,state = this.state
        // uniform props
        const uniformProps = {
            value:props.value,
            onChange:props.onChange,
            onBlur:props.onBlur,
            onFocus:props.onFocus,
            placeholder:props.placeholder,
            maxLength:props.maxLength,
            defaultValue:props.defaultValue,
            readOnly:props.disabled || props.readonly
        }
        let textareacx = cx('pinv_text_box','pinv_textarea_box','pinv_input_box_disable'),
            inputbox = cx('pinv_text_box','pinv_input_box'),
            inputcx = cx('pinv_input', {
                'pinv_input_readonly': props.disabled || props.readonly
              })
        return (
            (props.type === 'textarea'?<div
            style={Object.assign({}, props.style, this.state.inputStyles)}
            className={styles.pinv_controls}
          >
            <span className={textareacx}>
              <textarea
                className={styles.pinv_textarea}
                type={props.type || 'text'}
                {...uniformProps}
              />
            </span>
            {props.info}
          </div>:<div
          style={Object.assign({}, props.style, state.inputStyles)}
          className={styles.pinv_controls}
        >
          <span className={inputbox}>
            <input
              className={inputcx}
              type={props.type || 'text'}
              {...uniformProps}
            />
          </span>
          {props.info}
        </div>)
            
        )
    }
}