/*
 * @author: phil.li
 */
import type { App } from 'vue'
import * as components from './components'

export const install = (app: App) => {
	Object.keys(components).forEach((key) => {
		const component = (components as any)[key]
		if (component.install) {
			app.use(component)
		}
	})
}

export default install
