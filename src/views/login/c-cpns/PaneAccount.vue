<!-- 功能：功能描述; 作者：LZJ; 时间：2025年04月07日 20:16:45-->
<template>
	<div id="PaneAccount">
		<el-form ref="formRef" style="max-width: 600px" :model="loginForm" :rules="rules" label-width="auto" status-icon class="demo-dynamic">
			<el-form-item label="账号" prop="name">
				<el-input v-model="loginForm.name" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="loginForm.password" show-password />
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup name="PaneAccount" lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'

const loginForm = reactive<IAccount>({
	name: 'coderwhy',
	password: '123456'
})

const rules: FormRules = {
	name: [
		{ required: true, message: '必须输入用户名', trigger: 'blur' },
		{ pattern: /^[a-z0-9]{6,20}$/, message: '6-20位数字或者字符串组成', trigger: 'change' }
	],
	password: [
		{
			required: true,
			message: '必须输入密码',
			trigger: 'blur'
		},
		{ pattern: /^[a-z0-9]{3,}$/, message: '3位以上的数字或者字符串组成', trigger: 'change' }
	]
}

const formRef = ref<InstanceType<typeof ElForm>>()

const loginStore = useLoginStore()
// 登录
function loginAction() {
	formRef.value?.validate((valid, fields) => {
		if (valid) {
			const name = loginForm.name
			const password = loginForm.password
			loginStore.loginAccountAction({ name, password })
		} else {
			ElMessage.error('Oops, this is a error message.')
		}
	})
}
defineExpose({
	loginAction
})
</script>

<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<style lang="less" scoped>
#PaneAccount {
}
</style>
