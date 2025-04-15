import { createRouter, createWebHashHistory } from 'vue-router'

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
			component: () => import('../views/main/Main.vue')
		},
		{
			path: '/:pathMatch(.*)',
			component: () => import('../views/notFound/NotFound.vue')
		}
	]
})

export default router
