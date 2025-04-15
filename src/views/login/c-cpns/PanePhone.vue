<!-- 功能：功能描述; 作者：LZJ; 时间：2025年04月07日 20:16:45-->
<template>
	<div id="PanePhone">
		<el-form ref="formRef" style="max-width: 600px" :model="loginForm" label-width="auto" class="demo-dynamic">
			<el-form-item label="手机号" prop="account">
				<el-input v-model.number="loginForm.account" />
			</el-form-item>
			<el-form-item label="验证码" prop="pwd">
				<el-input v-model.number="loginForm.pwd" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup name="PanePhone" lang="ts">
import { reactive } from 'vue'
const loginForm = reactive({
	account: '',
	pwd: ''
})

// const rules = ref([])
</script>

<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<style lang="less" scoped>
#PanePhone {
}
</style>
