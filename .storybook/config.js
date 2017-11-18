import { configure } from '@kadira/storybook'
// https://csbun.github.io/blog/2017/03/preact-storybook/
function loadStories() {
	//使用require.context()创建自定义上下文，不用每次添加stories都需要更改配置
	const req = require.context('../stories', true, /\.js$/)
	req.keys().forEach(fileName => req(fileName))
  }
configure(loadStories, module)
