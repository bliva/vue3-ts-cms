import type { MockMethod } from 'vite-plugin-mock'
export default [
	{
		url: '/login',
		method: 'post',
		response: () => {
			return {
				name: 'admin',
				id: '@id',
				token: '@string(32)'
			}
		}
	},
	{
		url: `/users`,
		method: 'get',
		response: () => {
			return {
				id: '@id',
				name: 'admin',
				realName: 'admin',
				cellPhone: '19512345432',
				enable: '1',
				createAt: '2025-01-01 9:00:20',
				updateAt: '2025-01-03 9:00:20',
				role: {
					id: '@id',
					name: '超级管理员',
					intro: '所有权限',
					createAt: '2025-01-01 9:00:20',
					updateAt: '2025-01-03 9:00:20',
					leader: 'admin'
				}
			}
		}
	},
	{
		url: `/menus`,
		method: 'post',
		response: () => {
			return [
				{
					id: '38',
					name: '系统总览',
					type: 1,
					url: '/main/analysis',
					icon: 'el-icon-monitor',
					sort: 1,
					children: [
						{
							id: '39',
							name: '核心技术',
							type: 2,
							url: '/main/analysis/overview',
							sort: 106,
							children: null,
							parentId: '38'
						},
						{
							id: '40',
							name: '商品统计',
							type: 2,
							url: '/main/analysis/dashboard',
							sort: 107,
							children: null,
							parentId: '38'
						}
					]
				},
				{
					id: '1',
					name: '系统管理',
					type: 1,
					url: '/main/system',
					icon: 'el-icon-setting',
					sort: 2,
					children: [
						{
							id: '2',
							url: '/main/system/user',
							name: '用户管理',
							sort: 100,
							type: 2,
							parentId: '1',
							children: [
								{
									id: '5',
									url: null,
									name: '创建用户',
									sort: null,
									type: 3,
									parentId: '2',
									permission: 'system:users:create'
								},
								{
									id: '6',
									url: null,
									name: '删除用户',
									sort: null,
									type: 3,
									parentId: '2',
									permission: 'system:users:delete'
								},
								{
									id: '7',
									url: null,
									name: '修改用户',
									sort: null,
									type: 3,
									parentId: '2',
									permission: 'system:users:update'
								},
								{
									id: '8',
									url: null,
									name: '查询用户',
									sort: null,
									type: 3,
									parentId: '2',
									permission: 'system:users:query'
								}
							]
						},
						{
							id: '3',
							name: '部门管理',
							type: 2,
							url: '/main/analysis/department',
							sort: 101,
							children: null,
							parentId: '1'
						}
					]
				}
			]
		}
	}
] as MockMethod[]
