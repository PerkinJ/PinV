import { h } from 'preact'
import styles from './index.less'

const Tooltip = ({content,tooltipStyle,contentArr}) =>{
	return (
		<div id="tooltip" class={styles.tooltip} style={tooltipStyle}>
			{contentArr&&contentArr.map((d,index)=>
				<div key={index}>{d.key}:{d.value}</div>
			)}
			{content&&content}
		</div>
	)
}



export default Tooltip
