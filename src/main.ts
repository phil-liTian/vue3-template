import { createApp } from 'vue'
import './design/index.less'
import { setupProdMockServer } from './setupProdMockServer'
import PhilDesign from '@phil/design'
import 'uno.css'
import App from './App'
import './style.less'


function bootstrap() {
	const app = createApp(App)
	app.use(PhilDesign)

	app.mount('#app')
}

if ( process.env.NODE_ENV === 'development' ) {
	setupProdMockServer()
}

bootstrap()
