import { accountLoginRequest, getUserInfoById, getRoleMenuById } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { storage } from '@/utils/storage'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/mapMenus'

interface ILoginState {
	token: string
	userInfo: any
	userMenus: any
	permissions: string[]
}

const useLoginStore = defineStore('login', {
	state(): ILoginState {
		return {
			token: (storage.get({ name: LOGIN_TOKEN }) ?? '') as string,
			userInfo: {},
			userMenus: [],
			permissions: []
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
			storage.set({ name: 'userInfo', content: this.userInfo })
			const menuRes = await getRoleMenuById(id)
			this.userMenus = menuRes.data || []
			storage.set({ name: 'userMenus', content: this.userMenus })
			console.log('menuRes===', menuRes)

			// 重要: 获取登录用户的所有按钮的权限
			const permissions = mapMenusToPermissions(this.userMenus)
			console.log('permissions===', permissions)
			this.permissions = permissions

			// 重要: 动态的添加路由
			const routes = mapMenusToRoutes(this.userMenus)
			routes.forEach(route => router.addRoute('main', route))

			router.push('/main')
		},
		loadLocalCacheAction() {
			// 1.用户进行刷新默认加载数据
			const token = (storage.get({ name: LOGIN_TOKEN }) ?? '') as string
			const userInfo = storage.get({ name: 'userInfo' })
			const userMenus = storage.get({ name: 'userMenus' })
			if (token && userInfo && userMenus) {
				this.token = token
				this.userInfo = userInfo
				this.userMenus = userMenus

				// 2.获取按钮的权限
				const permissions = mapMenusToPermissions(this.userMenus)
				this.permissions = permissions

				// 3.动态添加路由
				const routes = mapMenusToRoutes(this.userMenus)
				routes.forEach(route => router.addRoute('main', route))
			}
		}
	}
})

export default useLoginStore
