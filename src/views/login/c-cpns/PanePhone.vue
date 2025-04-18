<!-- 功能：功能描述; 作者：LZJ; 时间：2025年04月07日 20:16:45-->
<template>
	<div id="PanePhone">
		<el-form ref="formRef" :model="loginForm" label-width="80px" class="demo-dynamic">
			<el-form-item label="手机号" prop="account">
				<el-input v-model.number="loginForm.account" />
			</el-form-item>
			<el-form-item label="验证码" prop="pwd">
				<div class="verify-code">
					<el-input />
					<el-button class="get-btn" type="primary">获取验证码</el-button>
				</div>
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
	.demo-dynamic {
		max-width: 600px;
		width: 600px;
	}
	.verify-code {
		display: flex;

		.get-btn {
			margin-left: 8px;
		}
	}
}
</style>
