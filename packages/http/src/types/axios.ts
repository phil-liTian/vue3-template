import { Recordable } from '@phil/types'

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
export type SuccessMessageMode = ErrorMessageMode

export interface RequestOptions {
	/**
	 * 请求token
	 */
	token?: string

	/**
	 * 是否需要携带token
	 */
	withToken?: boolean

	/**
	 * token是否携带前缀
	 */
	authenticationScheme?: string

	/**
	 * 是否合并请求参数到url, post请求将params和data拼接到url中
	 */
	joinParamsToUrl?: boolean

	/**
	 * 是否格式化请求的时间格式
	 */
	formatDate?: boolean

	/**
	 * 格式化时间的格式
	 */
	FORMAT_DATE?: string

	/**
	 * 自定义请求的apiUrl
	 */
	apiUrl?: string

	/**
	 * 是否加入请求时间
	 */
	joinTime?: boolean

	/**
	 * 是否返回原生响应头 比如：需要获取响应头时使用该属性
	 */

	isReturnNativeResponse?: boolean

	/**
	 * 是否直接返回数据, 不做任何处理
	 */
	isTransformResponse?: boolean

	/**
	 * 请求成功
	 */
	successMessageMode?: SuccessMessageMode

	/**
	 * 请求失败
	 */
	errorMessageMode?: ErrorMessageMode

	/**
	 * 请求失败是否弹出对话框, 这个对话框用使用者自定义
	 */
	errorCallBack?: (error: any) => void
}

export interface Result<T = any> {
	code: number
	message: string
	data: T
}

export enum ResultEnum {
	SUCCESS = 200,
	ERROR = -1,
	TIMEOUT = 401,
	TYPE = 'success',
}

export enum ContentTypeEnum {
	// json
	JSON = 'application/json;charset=UTF-8',
	// form-data qs
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data  upload
	FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export interface UploadFileParams {
	// Other parameters
	data?: Recordable
	// File parameter interface field name
	name?: string
	// file name
	file: File | Blob
	// file name
	filename?: string
	[key: string]: any
}
