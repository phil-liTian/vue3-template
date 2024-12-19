import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configMockPlugin } from '../plugins/mock'
function defineApplicationConfig() {
	return defineConfig({
		plugins: [vue(), vueJsx(), configMockPlugin()],
	})
}

export { defineApplicationConfig }
