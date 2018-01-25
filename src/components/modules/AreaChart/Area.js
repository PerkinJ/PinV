import {h,Component} from 'preact'

class Area extends Component{
	constructor(props){
		super(props)
		this.state = {

		}
	}
	static defaultProps = {
		fill: '#3182bd'
	}
	render({path,fill,handleMouseOver,handleMouseLeave}){
		return (
			<path
				className="areachart-area"
				d={path}
				fill={fill}
				onMouseOver={handleMouseOver}
				onMouseLeave={handleMouseLeave}
			/>
		)
	}
}

export default Area
