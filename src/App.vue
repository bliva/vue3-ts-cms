<!-- 功能：功能描述; 作者：LZJ; 时间：2025年04月07日 20:32:18-->
<template>
	<div id="App" class="app">
		<router-view></router-view>
	</div>
</template>

<script setup name="App" lang="ts">
import { useRoute } from 'vue-router'
import router from './router'

const route = useRoute()
window.addEventListener('hasChange', () => {
	const currentPath = window.location.hash.slice(1)
	if (route.path !== currentPath) {
		router.push(currentPath)
	}
})
</script>

<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<style lang="less" scoped>
#App {
	width: 100vw;
	height: 100vh;
}
</style>
