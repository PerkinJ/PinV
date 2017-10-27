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
        prefix: 'pinv',
        theme:'minoru'
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
        let theme = cx('input',`input--${props.theme}`),
        theme_filed = cx('input__field',`input__field--${props.theme}`),
        theme_label = cx('input__label', `input__label--${props.theme}`),
        theme_content = cx('input__label_content', `input__label-content--${props.theme}`)
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
          style={Object.assign({}, props.style)}
          class={styles.pinv_controls}
        >
        <span class={theme}>
            <input class={theme_filed} 
                style={Object.assign({}, props.inputStyles)}
                type={props.type || 'text'}
                {...uniformProps} 
            />
            <label style={Object.assign({}, props.labelStyle)} class={theme_label} data-content={props.label}>
                <span class={theme_content}>{props.label}</span>
            </label>
        </span>
          {props.info}  
        </div>)   
        )
    }
}