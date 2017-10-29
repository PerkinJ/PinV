import { h, Component } from 'preact'
import styles from './Input.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

export default class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputNumberHover:false,
        }
        this.handleInputNumberFocus = this.handleInputNumberFocus.bind(this)
        this.handleInputNumberBlur = this.handleInputNumberBlur.bind(this)        
    }
    static defaultProps = {
        disabled: false,
        prefix: 'pinv',
        theme: 'minoru',
        type: 'text',
        rows:'5',
        onFocus: () => null,
        onBlur: ()=> null
    }
    handleInputNumberFocus = ()=>{
        this.setState({
            inputNumberHover:true
        })
        this.props.onFocus()
    }
    handleInputNumberBlur = ()=>{
        this.setState({
            inputNumberHover:false
        })
        this.props.onBlur()
    }
    componentDidMount(){
        // preact 对inputNumber的focus,blur事件不支持，目前采用事件监听的方式来解决
        let inputNumber = document.querySelector('#inputNumber')
        inputNumber.addEventListener('focus',this.handleInputNumberFocus)
        inputNumber.addEventListener('blur',this.handleInputNumberBlur)
    }
    componentWillUnmount(){
        // let inputNumber = document.querySelector('#inputNumber')
        // inputNumber.removeEventListener('focus',this.handleInputNumberFocus)
        // inputNumber.removeEventListener('blur',this.handleInputNumberBlur)
    }
    render() {
        let { value, onChange, onBlur, onFocus, placeholder,
            maxLength, defaultValue, readonly, disabled, theme,
            style, inputStyle, labelStyle, label, type, info,rows,cols,textareaStyle } = this.props
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
         // 过滤其他不符合要求的theme    
        theme = theme === 'isao'? theme: 'minoru'
        type =  type !== 'textarea' ? type :'textarea'

        // 根据不同theme，设置textarea不同style
        let textareacx = cx('pinv_textarea_box'),
            textarea_filed = cx('pinv_textarea',`pinv_textarea--${theme}`,
                    { 'textarea__disabled': disabled || readonly }),
            textarea_label = cx('textarea__label',`textarea__label--${theme}`),
            textarea_content = cx('textarea__content',`textarea__content--${theme}`)
               
        // 根据不同theme，设置input不同的style
        let textFiled = cx('input', `input--${theme}`, ),
            textFiled_filed = cx('input__field',
                `input__field--${theme}`,
                { 'input__disabled': disabled || readonly }),
            textFiled_label = cx('input__label', `input__label--${theme}`),
            textFiled_content = cx('input__label_content', `input__label-content--${theme}`)

        // 根据不同theme，设置inputNumber不同的style
        let number = cx('input', `input--${theme}`, 'inputNumber'),
            number_filed = cx('input__field',
            `input__field--${theme}`,
            { 'input__disabled': disabled || readonly })
        const _this = this   
        switch (type) {
            case 'textarea':
                return (
                    <div
                        style={style}
                        className={styles.pinv_controls}
                    >
                        <span className={textareacx}>
                            <textarea
                                class={textarea_filed}
                                {...uniformProps}
                                rows={rows}
                                cols={cols}
                                style={textareaStyle}
                            />
                            <label style={labelStyle} class={textarea_label} data-content={label}>
                                <span class={textarea_content}>{label}</span>
                            </label>
                        </span>
                        {info}
                    </div>)
            case 'number':
                return(
                    <div
                        style={style}
                        class={styles.pinv_controls}
                    >
                        <span class={number}>
                            <div class={styles.inputNumber}>
                                <input
                                    type={type}
                                    class={number_filed} 
                                    {...uniformProps}
                                    step="1"
                                    id="inputNumber"
                                />
                                {this.state.inputNumberHover && <div  class={styles.inputNumber_box}>
                                    <button class={styles.inputNumber_up}>+</button>
                                    <button class={styles.inputNumber_down}>-</button>
                                </div>}
                       
                            </div>
                            <label style={labelStyle} class={textFiled_label} data-content={label}>
                                <span class={textFiled_content}>{label}</span>
                            </label>
                        </span>
                    </div>
                )        
            default:
                return (
                    <div
                        style={style}
                        class={styles.pinv_controls}
                    >
                        <span class={textFiled}>
                            <input class={textFiled_filed}
                                type={type}
                                style={inputStyle}
                                {...uniformProps}
                            />
                            <label style={labelStyle} class={textFiled_label} data-content={label}>
                                <span class={textFiled_content}>{label}</span>
                            </label>
                        </span>
                        {info}
                    </div>)
        }
    }
}