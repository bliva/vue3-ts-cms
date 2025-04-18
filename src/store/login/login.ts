import { accountLoginRequest, getUserInfoById, getRoleMenuById } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { storage } from '@/utils/storage'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'

interface ILoginState {
	token: string
	userInfo: any
	userMenus: any
}

const useLoginStore = defineStore('login', {
	state(): ILoginState {
		return {
			token: (storage.get({ name: LOGIN_TOKEN }) ?? '') as string,
			userInfo: {},
			userMenus: []
		}
	},
	actions: {
		async loginAccountAction(account: IAccount) {
			const res = await accountLoginRequest(account)
			const { data = {} } = res

			const id = data.id
			this.token = data.token
			storage.set({ name: LOGIN_TOKEN, content: this.token })

			const roleRes = await getUserInfoById(id)

			this.userInfo = roleRes.data || {}
			const menuRes = await getRoleMenuById(id)
			this.userMenus = menuRes.data || []
			console.log('menuRes===', menuRes)

			router.push('/main')
		}
	}
})

export default useLoginStore
