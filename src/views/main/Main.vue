<template>
	<div class="main">
		<el-container class="main-content">
			<el-aside :width="isFold ? '60px' : '210px'">
				<main-menu :is-fold="isFold" />
			</el-aside>
			<el-container>
				<el-header height="50px">
					<main-header @fold-change="handleFoldChange" />
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainHeader from '@/components/layout/mainHeader/MainHeader.vue'
import MainMenu from '@/components/layout/mainMenu/MainMenu.vue'

// 处理main-header中折叠的变化
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
	isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
	height: 100%;
}

.main-content {
	height: 100%;

	.el-aside {
		overflow-x: hidden;
		overflow-y: auto;
		line-height: 200px;
		text-align: left;
		cursor: pointer;
		background-color: #001529;
		scrollbar-width: none; /* firefox */
		-ms-overflow-style: none; /* IE 10+ */

		transition: width 0.3s ease;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.el-main {
		background-color: #f0f2f5;
	}
}
</style>
