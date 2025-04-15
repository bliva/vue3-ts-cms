import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
const useLoginStore = defineStore('login', {
	state() {
		return {
			id: '',
			token: localStorage.getItem('token') ?? '',
			name: ''
		}
	},
	actions: {
		async loginAccountAction(account: IAccount) {
			const res = await accountLoginRequest(account)
			const { data = {} } = res
			console.log('data===', res)

			this.id = data.id
			this.token = data.token
			this.name = data.name
			localStorage.setItem('token', this.token)
		}
	}
})

export default useLoginStore
