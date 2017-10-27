import { h, Component } from 'preact'
import styles from './Input.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

export default class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    static defaultProps = {
        disabled: false,
        prefix: 'pinv',
        theme: 'minoru',
        type: 'text'
    }
    render() {
        let { value, onChange, onBlur, onFocus, placeholder,
            maxLength, defaultValue, readonly, disabled, theme,
            style, inputStyle, labelStyle, label, type, info } = this.props
        let state = this.state
        // uniform props
        let uniformProps = {
            value,
            onChange,
            onBlur,
            onFocus,
            placeholder,
            maxLength,
            defaultValue,
            style,
            readOnly: disabled || readonly
        }
        let textareacx = cx('pinv_text_box', 'pinv_textarea_box'),
            inputbox = cx('pinv_text_box', 'pinv_input_box'),
            inputcx = cx('pinv_input', {
                'pinv_input_readonly': disabled || readonly
            })
        // 过滤其他不符合要求的theme    
        theme = theme === 'isao' || theme === 'minoru'? theme: 'minoru'
        type = type === 'text' || type === 'textarea' ? type :'text'
        // 根据不同theme，设置不同的style
        let textFiled = cx('input', `input--${theme}`, ),
            textFiled_filed = cx('input__field',
                `input__field--${theme}`,
                { 'input__disabled': disabled || readonly }),
            textFiled_label = cx('input__label', `input__label--${theme}`),
            textFiled_content = cx('input__label_content', `input__label-content--${theme}`)
        return (
            (type === 'textarea' ? <div
                style={Object.assign({}, style)}
                className={styles.pinv_controls}
            >
                <span className={textareacx}>
                    <textarea
                        className={styles.pinv_textarea}
                        {...uniformProps}
                    />
                </span>
                {info}
            </div> : <div
                style={style}
                class={styles.pinv_controls}
            >
                <span class={textFiled}>
                    <input class={textFiled_filed}
                        style={inputStyle}
                        {...uniformProps}
                    />
                    <label style={labelStyle} class={textFiled_label} data-content={label}>
                        <span class={textFiled_content}>{label}</span>
                    </label>
                </span>
                {info}
            </div>)
        )
    }
}