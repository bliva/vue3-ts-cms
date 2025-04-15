import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface AXSInterceptors<T = AxiosResponse> {
	requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
	requestInterceptorCatch?: (err: any) => any
	responseInterceptor?: (res: T) => T
	responseInterceptorCatch?: (err: any) => any
}

export interface AXSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: AXSInterceptors<T>
}
