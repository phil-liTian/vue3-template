
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { PluginOption } from 'vite'
import { configMockPlugin } from './mock'

export function createPlugins({
	isBuild,
	root,
	enableMock,
}: {
	isBuild: boolean
	root: string
	enableMock: boolean
}) {
	let vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()]

  if ( enableMock ) {
    vitePlugins.push(configMockPlugin())
  }

  // 生产上传腾讯云cloud
  if ( isBuild ) {
    // vitePlugins.push(new CosUpload())
  }

	return vitePlugins
}
