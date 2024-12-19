import { createApp } from 'vue'
import './style.css'
import PhilDesign from '@phil/design'
import App from './App'
import { createProdMockServer } from 'vite-plugin-mock/client'
import userMockFn from '../mock/user'

export async function setupProdMockServer() {
  console.log('a------>', ...userMockFn())
  
	const mockModules = [...userMockFn()]
	createProdMockServer(mockModules)
}


const app = createApp(App)
app.use(PhilDesign)

app.mount('#app')

setupProdMockServer()
