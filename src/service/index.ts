import { defHttp } from '@phil/http'

export const getUserList = () =>
	defHttp.get({ url: '/api/getUserList' }, { token: '12312' })

export const login = (params: any) =>
	defHttp.post({ url: '/api/login', params }, { token: '12312' })
