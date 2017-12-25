'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

var _Input = require('./Input.less');

var _Input2 = _interopRequireDefault(_Input);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _bind2.default.bind(_Input2.default);

var Input = (_temp = _class = function (_Component) {
	_inherits(Input, _Component);

	function Input(props) {
		_classCallCheck(this, Input);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleInputNumberFocus = function () {
			_this.setState({
				inputNumberHover: true
			});
			_this.props.onFocus();
		};

		_this.handleInputNumberBlur = function () {
			_this.setState({
				inputNumberHover: false
			});
			_this.props.onBlur();
		};

		_this.state = {
			inputNumberHover: false
		};
		_this.handleInputNumberFocus = _this.handleInputNumberFocus.bind(_this);
		_this.handleInputNumberBlur = _this.handleInputNumberBlur.bind(_this);
		return _this;
	}

	Input.prototype.componentDidMount = function componentDidMount() {
		// preact 对inputNumber的focus,blur事件不支持，目前采用事件监听的方式来解决
		var inputNumber = document.querySelector('#inputNumber');
		inputNumber.addEventListener('focus', this.handleInputNumberFocus);
		inputNumber.addEventListener('blur', this.handleInputNumberBlur);
	};

	Input.prototype.componentWillUnmount = function componentWillUnmount() {
		// let inputNumber = document.querySelector('#inputNumber')
		// inputNumber.removeEventListener('focus',this.handleInputNumberFocus)
		// inputNumber.removeEventListener('blur',this.handleInputNumberBlur)
	};

	Input.prototype.render = function render() {
		var _props = this.props,
		    value = _props.value,
		    onChange = _props.onChange,
		    onBlur = _props.onBlur,
		    onFocus = _props.onFocus,
		    placeholder = _props.placeholder,
		    maxLength = _props.maxLength,
		    defaultValue = _props.defaultValue,
		    readonly = _props.readonly,
		    disabled = _props.disabled,
		    theme = _props.theme,
		    style = _props.style,
		    inputStyle = _props.inputStyle,
		    labelStyle = _props.labelStyle,
		    label = _props.label,
		    type = _props.type,
		    info = _props.info,
		    rows = _props.rows,
		    cols = _props.cols,
		    textareaStyle = _props.textareaStyle;
		// uniform props

		var uniformProps = {
			value: value,
			onChange: onChange,
			onBlur: onBlur,
			onFocus: onFocus,
			placeholder: placeholder,
			maxLength: maxLength,
			defaultValue: defaultValue,
			style: style,
			readOnly: disabled || readonly
			// 过滤其他不符合要求的theme
		};theme = theme === 'isao' ? theme : 'minoru';
		type = type !== 'textarea' ? type : 'textarea';

		// 根据不同theme，设置textarea不同style
		var textareacx = cx('pinv_textarea_box'),
		    textarea_filed = cx('pinv_textarea', 'pinv_textarea--' + theme, { 'textarea__disabled': disabled || readonly }),
		    textarea_label = cx('textarea__label', 'textarea__label--' + theme),
		    textarea_content = cx('textarea__content', 'textarea__content--' + theme);

		// 根据不同theme，设置input不同的style
		var textFiled = cx('input', 'input--' + theme),
		    textFiled_filed = cx('input__field', 'input__field--' + theme, { 'input__disabled': disabled || readonly }),
		    textFiled_label = cx('input__label', 'input__label--' + theme),
		    textFiled_content = cx('input__label_content', 'input__label-content--' + theme);

		// 根据不同theme，设置inputNumber不同的style
		var number = cx('input', 'input--' + theme, 'inputNumber'),
		    number_filed = cx('input__field', 'input__field--' + theme, { 'input__disabled': disabled || readonly });
		switch (type) {
			case 'textarea':
				return (0, _preact.h)(
					'div',
					{
						style: style,
						className: _Input2.default.pinv_controls
					},
					(0, _preact.h)(
						'span',
						{ className: textareacx },
						(0, _preact.h)('textarea', _extends({
							'class': textarea_filed
						}, uniformProps, {
							rows: rows,
							cols: cols,
							style: textareaStyle
						})),
						(0, _preact.h)(
							'label',
							{ style: labelStyle, 'class': textarea_label, 'data-content': label },
							(0, _preact.h)(
								'span',
								{ 'class': textarea_content },
								label
							)
						)
					),
					info
				);
			case 'number':
				return (0, _preact.h)(
					'div',
					{
						style: style,
						'class': _Input2.default.pinv_controls
					},
					(0, _preact.h)(
						'span',
						{ 'class': number },
						(0, _preact.h)(
							'div',
							{ 'class': _Input2.default.inputNumber },
							(0, _preact.h)('input', _extends({
								type: type,
								'class': number_filed
							}, uniformProps, {
								step: '1',
								id: 'inputNumber'
							})),
							this.state.inputNumberHover && (0, _preact.h)(
								'div',
								{ 'class': _Input2.default.inputNumber_box },
								(0, _preact.h)(
									'button',
									{ 'class': _Input2.default.inputNumber_up },
									'+'
								),
								(0, _preact.h)(
									'button',
									{ 'class': _Input2.default.inputNumber_down },
									'-'
								)
							)
						),
						(0, _preact.h)(
							'label',
							{ style: labelStyle, 'class': textFiled_label, 'data-content': label },
							(0, _preact.h)(
								'span',
								{ 'class': textFiled_content },
								label
							)
						)
					)
				);
			default:
				return (0, _preact.h)(
					'div',
					{
						style: style,
						'class': _Input2.default.pinv_controls
					},
					(0, _preact.h)(
						'span',
						{ 'class': textFiled },
						(0, _preact.h)('input', _extends({ 'class': textFiled_filed,
							type: type,
							style: inputStyle
						}, uniformProps)),
						(0, _preact.h)(
							'label',
							{ style: labelStyle, 'class': textFiled_label, 'data-content': label },
							(0, _preact.h)(
								'span',
								{ 'class': textFiled_content },
								label
							)
						)
					),
					info
				);
		}
	};

	return Input;
}(_preact.Component), _class.defaultProps = {
	disabled: false,
	prefix: 'pinv',
	theme: 'minoru',
	type: 'text',
	rows: '5',
	onFocus: function onFocus() {
		return null;
	},
	onBlur: function onBlur() {
		return null;
	}
}, _temp);
exports.default = Input;
//# sourceMappingURL=Input.js.map