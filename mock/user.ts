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
					result: { a: 21, 'import.meta.url': import.meta.url },
				}
			},
		},
		{
			url: '/api/getUserListFail',
			method: 'get',
			response: ({ body, query }) => {
				return {
					code: 403,
					message: '请求超时',
					result: { a: 21, 'import.meta.url': import.meta.url },
				}
			},
		},
		{
			url: '/api/login',
			method: 'post',
			response: async ({ body, query }) => {
				return {
					code: 200,
					message: 'success',
					result: {
						a: 21,
						'import.meta.url': import.meta.url,
						time: Date.now(),
					},
				}
			},
		},

		{
			url: '/api/error',
			method: 'get',
			response: ({ body, query }) => {
				return {}
			},
		},
	]
}
