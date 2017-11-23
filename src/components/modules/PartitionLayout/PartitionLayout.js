import { h } from 'preact'
import HierarchyLayout from '../../basic/HierarchyLayout'

const SunburstLayout = (props)=>{
	return 	<HierarchyLayout {...props} type="partition" />
}
export default SunburstLayout
