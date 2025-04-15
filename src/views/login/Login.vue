<!-- 功能：功能描述; 作者：LZJ; 时间：2025年04月07日 20:16:45-->
<template>
	<div id="Login" class="full-content">
		<LoginPanel></LoginPanel>
	</div>
</template>

<script setup name="Main" lang="ts">
import LoginPanel from './c-cpns/LoginPanel.vue'
</script>

<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<style lang="less" scoped>
#Login {
	display: flex;
	justify-content: center;
	align-items: center;
	background: url('@/assets/img/login-bg.svg');
}
</style>
