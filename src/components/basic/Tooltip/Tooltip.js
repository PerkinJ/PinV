import { h } from 'preact'
const styles = {
	tooltip:{
		position:'fixed',
		width:'auto',
		height:'auto',
		opacity:0,
		textAlign:'center',
		borderRadiu:3,
		background:'#fff',
		padding:'10px 20px',
		border:'1px solid #ccc',
		zIndex:999
	}
}
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
