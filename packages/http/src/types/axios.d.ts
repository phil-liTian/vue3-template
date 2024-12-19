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
}

export interface Result<T = any> {
	code: number
	message: string
	data: T
}
