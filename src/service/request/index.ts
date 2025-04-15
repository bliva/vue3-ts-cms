import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AXSRequestConfig, AXSInterceptors } from './type'

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class AXSRequest {
	instance: AxiosInstance
	interceptors?: AXSInterceptors

	// request实例 => axios的实例
	constructor(config: AXSRequestConfig) {
		this.instance = axios.create(config)
		this.interceptors = config.interceptors

		// 每一个实例都有自己的拦截器（给所有实例添加实例）
		this.instance.interceptors.request.use(
			config => {
				console.log('所有实例都有的拦截器，请求成功')
				return config
			},
			err => {
				console.log('所有实例都有的拦截器，请求失败')
				return err
			}
		)

		this.instance.interceptors.response.use(
			res => {
				console.log('所有实例都有的拦截器，响应成功')
				return res
			},
			err => {
				console.log('所有实例都有的拦截器，响应失败')
				return err
			}
		)

		// 针对特定的AXSRequest实例添加拦截器
		this.instance.interceptors.request.use(this.interceptors?.requestInterceptor, this.interceptors?.requestInterceptorCatch)
		this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch)
	}

	request<T = any>(config: AXSRequestConfig<T>): Promise<T> {
		// 单个接口的请求拦截
		// if (config.interceptors?.requestInterceptor) {
		// 	config = config.interceptors.requestInterceptor(config)
		// }

		return new Promise<T>((resolve, reject) => {
			this.instance
				.request<any, T>(config)
				.then(res => {
					// if (config.interceptors?.responseInterceptor) {
					// 	res = config.interceptors.responseInterceptor(res)
					// }
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	get<T = any>(config: AXSRequestConfig<T>) {
		return this.request({ ...config, method: 'GET' })
	}
	post<T = any>(config: AXSRequestConfig<T>) {
		return this.request({ ...config, method: 'POST' })
	}
	delete<T = any>(config: AXSRequestConfig<T>) {
		return this.request({ ...config, method: 'DELETE' })
	}
	patch<T = any>(config: AXSRequestConfig<T>) {
		return this.request({ ...config, method: 'PATCH' })
	}
}

export default AXSRequest
