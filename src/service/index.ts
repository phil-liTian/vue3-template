import { defHttp, createAxios } from '@phil/http'
const http = createAxios({
	requestOptions: {
		formatDate: true,
		FORMAT_DATE: 'YYYY-MM-DD HH:mm:ss',
	},
})

export const getUserList = () =>
	defHttp.get({ url: '/api/getUserList' }, { token: '12312' })

export const getUserListFail = () =>
	defHttp.get({ url: '/api/getUserListFail' }, { token: '12312' })

export const login = (params: any) =>
	http.post({ url: '/api/login', params }, { token: '12312' })

export const getError = () =>
	defHttp.get({ url: '/api/error' }, { token: '12312' })
