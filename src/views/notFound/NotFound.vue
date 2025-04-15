<!-- 功能：功能描述; 作者：LZJ; 时间：2025年04月07日 20:34:14-->
<template>
	<div id="NotFound">
		<h2>
			找不到
			<span class="c-red">{{ $route.path }}</span>
			对应的页面
		</h2>
	</div>
</template>

<script setup name="NotFound" lang="ts"></script>

<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<style lang="less" scoped>
#NotFound {
}
</style>
