import type { MockMethod } from 'vite-plugin-mock'
export default [
	{
		url: '/login',
		method: 'post',
		response: () => {
			return {
				name: 'lzj',
				id: '@id',
				token: '@string(32)'
			}
		}
	}
] as MockMethod[]
