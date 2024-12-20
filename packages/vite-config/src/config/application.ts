
import { defineConfig, loadEnv, mergeConfig, UserConfig } from 'vite'
import { commonConfig } from './common'
import { resolve } from 'path'
import dayjs from 'dayjs'
import { createPlugins } from '../plugins'
import { generateModifyVars } from '../utils/modifierVars'

interface DefineConfig {
	overrides?: UserConfig // 可覆盖当前配置
}

function defineApplicationConfig(defineConfigs: DefineConfig = {}) {
	const { overrides } = defineConfigs
	return defineConfig(({ command, mode }) => {
		const root = process.cwd()
		const isBuild = command === 'build'
		const { VITE_PUBLIC_PATH, VITE_USE_MOCK } = loadEnv(mode, root)

		const plugins = createPlugins({
			isBuild,
			root,
			enableMock: VITE_USE_MOCK === 'true',
		})
		const timestamp = new Date().getTime()
		const applicationConfig: UserConfig = {
			base: VITE_PUBLIC_PATH,
			plugins,
			resolve: {
				alias: {
					'#': resolve(root, 'src/types'),
					'@': resolve(root, 'src'),
					'@r': resolve(root, 'src/router'),
					'@v': resolve(root, 'src/views'),
					'@c': resolve(root, 'src/components'),
					'@u': resolve(root, 'src/utils'),
					'@h': resolve(root, 'src/hooks'),
					'@e': resolve(root, 'src/enums'),
					'@store': resolve(root, 'src/store'),
					'@service': resolve(root, 'src/service'),
				},
			},
			build: {
				target: 'es2015',
				cssTarget: 'chrome80',
				rollupOptions: {
					output: {
						dir: 'dist/',
						// 入口文件名
						// entryFileNames: `assets/entry/[name]-[hash]-${timestamp}.js`,
						manualChunks: {
							vue: ['vue'],
							antd: ['ant-design-vue', '@ant-design/icons-vue'],
						},
					},
				},
			},
			define: {
				__APP_INFO__: {
					lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
				},
			},
			css: {
				preprocessorOptions: {
					less: {
						modifyVars: generateModifyVars(),
						javascriptEnabled: true,
					},
				},
			},
		}

		const mergedConfig = mergeConfig(applicationConfig, commonConfig(mode))

		return mergeConfig(mergedConfig, overrides || {})
	})
}

export { defineApplicationConfig }
