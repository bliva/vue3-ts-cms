import axsRequest from '../index'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
	return axsRequest.post({
		url: '/login',
		data: account
	})
}
