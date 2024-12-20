import { isString, deepMerge, isFunction } from '@phil/utils'
import { AxiosRetry } from './axios/axiosRetry'
import PAxios from './axios/Axios'
import type { AxiosInstance } from 'axios'
import { AxiosTransform, CreateAxiosOptions } from './axios/axiosTransform'
import { Recordable } from '@phil/types'
import { useMessage } from '@phil/design'
import { ContentTypeEnum, ResultEnum, RequestOptions } from './types/axios'
import {
	DATE_TIME_FORMAT,
	formatRequestDate,
	joinTimestamp,
	setObjToUrlParams,
} from './axios/helper'
import axios from 'axios'
import { AxiosCanceler } from './axios/axiosCancel'

const { createMessage, createSuccessModal, createErrorModal } = useMessage()
const transform: AxiosTransform = {
	/**
	 * @description 请求hook
	 */
	beforeRequestHook(config, options) {
		const {
			apiUrl,
			joinTime = true,
			joinParamsToUrl,
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
	 * @description 响应hook
	 */
	transformResponseHook(res, options) {
		const {
			isReturnNativeResponse,
			isTransformResponse,
			successMessageMode,
			errorMessageMode,
			errorCallBack,
		} = options

		if (isReturnNativeResponse) {
			return res
		}

		if (!isTransformResponse) {
			return res.data
		}
		const { data } = res
		if (!data) {
			throw new Error('请求失败')
		}
		const { code, message, result } = data

		const hasSuccess =
			data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS

		if (hasSuccess) {
			// 成功
			let successMsg = message || '操作成功'

			if (successMessageMode === 'message') {
				createMessage.success(successMsg)
			} else if (successMessageMode === 'modal') {
				createSuccessModal({
					title: '温馨提示',
					content: successMsg,
				})
			}

			return result
		}

		let errorMsg: string
		// 请求失败 分几种情况
		switch (code) {
			case ResultEnum.TIMEOUT:
				// 超时，登出
				errorMsg = '接口请求超时,请刷新页面重试!'
				break
			default:
				errorMsg = message || '请求失败'
		}

		if (errorMessageMode === 'message') {
			createMessage.error(errorMsg)
		} else if (errorMessageMode === 'modal') {
			createErrorModal({ title: '错误提示', content: errorMsg })
		}

		// 根据业务场景使用
		if (errorCallBack && isFunction(errorCallBack)) {
			errorCallBack(res)
		}

		return res
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

	requestCatchHook(e) {
		return Promise.reject(e)
	},

	responseInterceptors(res) {
		return res
	},

	/**
	 * @description 响应的错误处理, 处理http请求非200的情况
	 */
	responseInterceptorsCatch(axiosInstance: AxiosInstance, error: any) {
		const { code, message, config } = error || {}
		const err: string = error?.toString?.() ?? ''
		const { errorCallBack } = config?.requestOptions
		let errMessage = ''
		const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
		if (axios.isCancel(error)) {
			return Promise.reject(error)
		}

		try {
			if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
				errMessage = '请求超时'
			}
			if (err?.includes('Network Error')) {
				errMessage = '网络错误'
			}

			if (errorMessageMode === 'message') {
				createMessage.error(errMessage)
			} else if (errorMessageMode === 'modal') {
				createErrorModal({ title: '服务器错误', content: errMessage })
			}
		} catch (error) {
			throw new Error(error as unknown as string)
		}

		// 根据业务场景使用
		if (errorCallBack && isFunction(errorCallBack)) {
			errorCallBack(error)
		}

		// 添加重试机制
		const { isOpenRetry } = config.requestOptions.retryRequest
		const retryRequest = new AxiosRetry()
		config.method?.toUpperCase() === 'GET' &&
			isOpenRetry &&
			retryRequest.retry(axiosInstance, error)

		return Promise.reject(error)
	},
}

export const createAxios = (opt: Partial<CreateAxiosOptions> = {}) => {
	return new PAxios(
		deepMerge(
			{
				timeout: 1000 * 30,
				baseURL: '',
				headers: { 'Content-Type': ContentTypeEnum.JSON },
				transform,
				requestOptions: {
					withToken: true,
					authenticationScheme: 'Bearer',
					token: '123',
					joinParamsToUrl: false,
					joinTime: true,
					isReturnNativeResponse: false,
					isTransformResponse: true,
					successMessageMode: 'none',
					errorMessageMode: 'none',
					formatDate: true,
					FORMAT_DATE: DATE_TIME_FORMAT,
					// 忽略重复请求
					ignoreCancelToken: true,
					// 延时重试机制
					retryRequest: {
						isOpenRetry: false,
						count: 5,
						waitTime: 1000,
					},
				},
			},
			opt
		)
	)
}

export const defHttp = createAxios()

export { AxiosCanceler, type RequestOptions }
