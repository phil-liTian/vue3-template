import type { MockConfig } from 'vite-plugin-mock'

export default (config?: MockConfig) => {
	return [
		{
			url: '/api/getUserList',
			method: 'get',
			response: ({ body, query }) => {
				return {
					code: 200,
					message: 'success',
					data: { a: 21, 'import.meta.url': import.meta.url },
				}
			},
		},
		{
			url: '/api/login',
			method: 'post',
			response: ({ body, query }) => {
				return {
					code: 200,
					message: 'success',
					data: { a: 21, 'import.meta.url': import.meta.url },
				}
			},
		},
	]
}
