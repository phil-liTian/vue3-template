import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'
import { cloneDeep } from 'lodash-es'
import { isFunction } from '@phil/utils'
import { CreateAxiosOptions } from './axiosTransform'
import {
	ContentTypeEnum,
	RequestOptions,
	Result,
	UploadFileParams,
} from '../types/axios'

class PAxios {
	private readonly options: CreateAxiosOptions
	private axiosInstance: AxiosInstance
	constructor(options: CreateAxiosOptions) {
		this.options = options

		this.axiosInstance = axios.create(options)
		// 处理拦截器
		this.setupInterceptors()
	}

	private getTransform() {
		const { transform } = this.options
		return transform
	}

	getAxios(): AxiosInstance {
		return this.axiosInstance
	}

	/**
	 * @description: 拦截器配置
	 */
	setupInterceptors() {
		const {
			options: { transform },
		} = this

		const {
			requestInterceptors,
			requestInterceptorsCatch,
			responseInterceptors,
			responseInterceptorsCatch,
		} = transform

		// 请求拦截器
		this.axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				if (requestInterceptors && isFunction(requestInterceptors)) {
					config = requestInterceptors(config, this.options)
				}
				return config
			},
			requestInterceptorsCatch &&
				isFunction(requestInterceptorsCatch) &&
				requestInterceptorsCatch
		)

		// 响应拦截器
		this.axiosInstance.interceptors.response.use(
			(res: AxiosResponse) => {
				if (responseInterceptors && isFunction(responseInterceptors)) {
					res = responseInterceptors(res)
				}
				return res
			},
			(error) =>
				responseInterceptorsCatch &&
				isFunction(responseInterceptorsCatch) &&
				responseInterceptorsCatch(this.axiosInstance, error)
		)
	}

	/**
	 * @description 上传文件
	 */
	upload<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
		const formData = new FormData()
		if (params.filename) {
			formData.append(params.name || 'file', params.file, params.filename)
		} else {
			formData.append(params.name || 'file', params.file)
		}

		if (params.data) {
			Object.keys(params.data).forEach((key) => {
				const value = params.data![key]
				if (Array.isArray(value)) {
					value.forEach((item) => {
						formData.append(`${key}[]`, item)
					})
					return
				}

				formData.append(key, params.data![key])
			})
		}

		return this.axiosInstance.request<T>({
			...config,
			method: 'POST',
			data: formData,
			headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
		})
	}

	get<T = any>(
		config: AxiosRequestConfig,
		options: RequestOptions = {}
	): Promise<T> {
		return this.request({ ...config, method: 'GET' }, options)
	}

	post<T = any>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		return this.request({ ...config, method: 'POST' }, options)
	}

	put<T = any>(
		config: AxiosRequestConfig,
		options: RequestOptions = {}
	): Promise<T> {
		return this.request({ ...config, method: 'PUT' }, options)
	}

	delete<T = any>(
		config: AxiosRequestConfig,
		options: RequestOptions = {}
	): Promise<T> {
		return this.request({ ...config, method: 'DELETE' }, options)
	}

	request<T = any>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		let conf: AxiosRequestConfig = cloneDeep(config)
		const { beforeRequestHook, transformResponseHook, requestCatchHook } =
			this.getTransform() || {}
		const { requestOptions } = this.options
		const opt: RequestOptions = Object.assign({}, requestOptions, options)

		// 处理请求的参数, 比如时间格式化处理, 加请求时间等
		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			conf = beforeRequestHook(conf, opt)
		}

		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request(conf)
				.then((res: AxiosResponse<Result>) => {
					if (transformResponseHook && isFunction(transformResponseHook)) {
						try {
							const ret = transformResponseHook(res, opt)
							resolve(ret)
						} catch (error) {
							reject(error)
						}
						return
					}
					resolve(res as unknown as Promise<T>)
				})
				.catch((error) => {
					if (requestCatchHook && isFunction(requestCatchHook)) {
						reject(requestCatchHook(error, opt))
						return
					}
					reject(error)
				})
		})
	}
}

export default PAxios
