import {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'
import { RequestOptions, Result } from '../types/axios'

export abstract class AxiosTransform {
	/**
	 * @description: 请求之前处理config
	 */
	beforeRequestHook?: (
		config: AxiosRequestConfig,
		options: RequestOptions
	) => AxiosRequestConfig

	/**
	 * @description: 请求之后处理response
	 */
	transformResonseHook?: (
		res: AxiosResponse<any>,
		options: RequestOptions
	) => any

	/**
	 * @description: 请求失败处理
	 */
	requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

	/**
	 * @description: 请求拦截器处理
	 */
	requestInterceptors?(
		config: InternalAxiosRequestConfig,
		options: CreateAxiosOptions
	): InternalAxiosRequestConfig

	/**
	 * @description: 响应拦截器处理
	 */
	responseInterceptors?(res: AxiosResponse<Result>): AxiosResponse<any>

	/**
	 * @description: 请求错误处理
	 */
	requestInterceptorsCatch?: (error: Error) => void

	/**
	 * @description: 响应错误处理
	 */
	responseInterceptorsCatch?: (
		axiosInstance: AxiosInstance,
		error: Error
	) => void
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
	authenticationScheme?: string
	transform: AxiosTransform
	requestOptions: RequestOptions
}
