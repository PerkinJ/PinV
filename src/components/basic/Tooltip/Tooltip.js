import { h } from 'preact'
import styles from './index.less'

const Tooltip = ({content,tooltipStyle}) =>
	<div class={styles.tooltip} style={tooltipStyle}>
		{content}
	</div>


export default Tooltip
