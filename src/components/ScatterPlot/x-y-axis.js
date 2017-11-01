import { h } from 'preact'
import Axis from './axis'
import styles from './index.less'

export default (props) => {
	const xSettings = {
		translate: `translate(0, ${props.height - props.padding})`,
		scale: props.xScale,
		orient: 'bottom'
	}
	const ySettings = {
		translate: `translate(${props.padding}, 0)`,
		scale: props.yScale,
		orient: 'left'
	}
	return <g class={styles.xy_axis}>
		<Axis {...xSettings} />
		<Axis {...ySettings} />
	</g>
}
