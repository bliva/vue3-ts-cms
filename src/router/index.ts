import { createRouter, createWebHashHistory } from 'vue-router'
import { storage } from '@/utils/storage'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/mapMenus'
const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			redirect: 'main'
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('../views/login/Login.vue')
		},
		{
			path: '/main',
			name: 'Main',
			meta: {
				title: '主页面',
				auth: true // 当有这个字段的时候，我们就认为他这个路由页面是要有登录权限的
			},
			component: () => import('../views/main/Main.vue')
		},
		{
			path: '/:pathMatch(.*)',
			component: () => import('../views/notFound/NotFound.vue')
		}
	]
})

// 路由守卫
router.beforeEach((to, from) => {
	const token = storage.get({ name: LOGIN_TOKEN }) || ''
	console.log('token=====', token)

	if (Object.is(to?.meta?.auth, false)) {
	} else {
		if (token) {
			if (to.path === '/login' || (to.path !== '/main' && (from.path === '/' || from.path === '/login'))) {
				return '/main'
			} else {
				if (to.path === '/main') {
					return firstMenu?.url
				}
			}
		} else {
			if (to.path !== '/login') {
				return '/login'
			} else {
			}
		}
	}
})

export default router
