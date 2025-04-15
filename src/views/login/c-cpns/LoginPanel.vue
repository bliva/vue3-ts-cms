<!-- 功能：功能描述; 作者：LZJ; 时间：2025年04月07日 20:16:45-->
<template>
	<div id="LoginPanel">
		<h2 class="title">后台管理系统</h2>
		<el-tabs type="border-card" v-model="activeName">
			<el-tab-pane name="account">
				<template #label>
					<span class="label">
						<el-icon><UserFilled /></el-icon>
						<span class="text">账号登录</span>
					</span>
				</template>
				<PaneAccount ref="accountRef" />
			</el-tab-pane>
			<el-tab-pane name="phone">
				<template #label>
					<span class="label">
						<el-icon><Cellphone /></el-icon>
						<span class="text">手机登录</span>
					</span>
				</template>
				<PanePhone ref="phoneRef" />
			</el-tab-pane>
		</el-tabs>
		<div class="controls">
			<el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
			<el-link type="primary">忘记密码</el-link>
		</div>
		<el-button class="login-btn" size="large" type="primary" @click="loginClick">登录</el-button>
	</div>
</template>

<script setup name="LoginPanel" lang="ts">
import { ref } from 'vue'
import PaneAccount from './PaneAccount.vue'
import PanePhone from './PanePhone.vue'
const isRemPwd = ref(false)
const activeName = ref('account')
// typeof PaneAccount 拿到的是PaneAccount的实例对象，相当于是new PaneAccount, 所以InstanceType<typeof PaneAccount>拿到的就是PaneAccount
const accountRef = ref<InstanceType<typeof PaneAccount>>()
const phoneRef = ref<InstanceType<typeof PanePhone>>()

const loginClick = () => {
	if (activeName.value === 'account') {
		accountRef.value?.loginAction()
	} else {
	}
}
</script>

<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<style lang="less" scoped>
#LoginPanel {
	width: 330px;
	margin-bottom: 150px;

	.title {
		text-align: center;
		margin-bottom: 15px;
	}

	.label {
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			margin-left: 5px;
		}
	}

	.controls {
		margin-top: 12px;
		display: flex;

		justify-content: space-between;
	}

	.login-btn {
		margin-top: 10px;
		width: 100%;
		// --el-button-size: 50px;
	}

	:deep(.el-tabs--border-card > .el-tabs__header .el-tabs__item) {
		width: 165px;
	}
}
</style>
