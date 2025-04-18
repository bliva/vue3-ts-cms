import axsRequest from '../index'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
	return axsRequest.post({
		url: '/login',
		data: account
	})
}

export function getUserInfoById(id: string) {
	return axsRequest.get({
		url: '/users',
		data: id
	})
}

export function getRoleMenuById(id: string) {
	return axsRequest.post({
		url: '/menus',
		data: id
	})
}
