import { isString } from '@phil/utils'
import PAxios from './axios/Axios'
import { AxiosTransform, CreateAxiosOptions } from './axios/axiosTransform'
import { Recordable } from '@phil/types'
import {
	formatRequestDate,
	joinTimestamp,
	setObjToUrlParams,
} from './axios/helper'

const transform: AxiosTransform = {
	/**
	 * @description 请求hook
	 */
	beforeRequestHook(config, options) {
		const {
			apiUrl,
			joinTime = true,
			joinParamsToUrl = false,
			formatDate = true,
			FORMAT_DATE = 'YYYY-MM-DD',
		} = options

		// 可动态指定request的请求域名
		if (apiUrl && isString(apiUrl)) {
			config.url = `${apiUrl}${config.url}`
		}

		const params = config.params || {}
		const data = config.data || {}
		// 是否将请求的时间格式化
		formatDate &&
			data &&
			!isString(data) &&
			formatRequestDate(data, FORMAT_DATE)
		formatDate &&
			params &&
			!isString(params) &&
			formatRequestDate(params, FORMAT_DATE)

		if (config.method?.toUpperCase() === 'GET') {
			if (isString(params)) {
				// restful
				config.url = `${config.url}${params}${joinTimestamp(joinTime, true)}`
				config.params = undefined
			} else {
				config.params = Object.assign(
					params || {},
					joinTimestamp(joinTime, false)
				)
			}
		} else {
			if (isString(params)) {
				// restful
				config.url = config.url + params
				config.params = undefined
			} else {
				if (
					(Reflect.has(config, 'data') &&
						Reflect.ownKeys(config.data).length > 0) ||
					config.data instanceof FormData
				) {
					config.data = data
					config.params = params
				} else {
					// 非GET请求时, params一律视为data
					config.data = params
					config.params = undefined
				}

				if (joinParamsToUrl) {
					config.url = setObjToUrlParams(
						config.url as string,
						Object.assign({}, config.params, config.data)
					)
				}
			}
		}

		return config
	},

	/**
	 * @description 拦截器的处理
	 */
	requestInterceptors: (config, options: CreateAxiosOptions) => {
		const {
			requestOptions: { token, authenticationScheme },
		} = options

		if (token && (config as Recordable).requestOptions?.withToken) {
			config.headers.Authorization = authenticationScheme
				? `${authenticationScheme} ${token}`
				: token
		}

		return config
	},

	requestCatchHook(e, options) {
		return Promise.reject(e)
	},

	responseInterceptors(res) {
		return res
	},

	responseInterceptorsCatch(e, options) {
		return Promise.reject(e)
	},
}

const createAxios = (opt: Partial<CreateAxiosOptions> = {}) => {
	return new PAxios({
		transform,
		requestOptions: {
			withToken: true,
			authenticationScheme: 'Bearer',
			token: '123',
		},
		...opt,
	})
}

export const defHttp = createAxios()
