import { BASE_URL, TIME_OUT } from './config'
import AXSRequest from './request'
import { storage } from '@/utils'
import { LOGIN_TOKEN } from '@/global/constants'

const axsRequest = new AXSRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requestInterceptor: config => {
			const token = storage.get({ name: LOGIN_TOKEN }) || ''
			if (token && config.headers) {
				config.headers.Authorization = 'Bearer' + token
			}
			console.log('AXSRequest请求成功的拦截')
			return config
		},
		requestInterceptorCatch: err => {
			console.log('AXSRequest请求失败的拦截')
			return err
		},
		responseInterceptor: res => {
			console.log('AXSRequest响应成功的拦截')
			return res
		},
		responseInterceptorCatch: err => {
			console.log('AXSRequest响应失败的拦截')
			return err
		}
	}
})

export default axsRequest
