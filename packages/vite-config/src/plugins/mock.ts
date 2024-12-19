import { viteMockServe } from 'vite-plugin-mock'

export const configMockPlugin = () => {
	return viteMockServe({
		ignore: /^_/, // 以_开头的
		mockPath: 'mock',
		enable: true,
		logger: true,
	})
}
