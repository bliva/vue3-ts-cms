import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import checker from 'vite-plugin-checker'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig({
	build: {
		target: 'es2022', // 现代浏览器目标
		minify: 'terser', // 或 'esbuild' (构建速度更快)
		cssMinify: 'esbuild', // CSS 压缩
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['alert']
			}
		},
		rollupOptions: {
			output: {
				// 智能代码分割策略
				manualChunks(id) {
					if (id.includes('node_modules')) {
						// 大体积依赖单独分块
						if (id.includes('echarts')) return 'vendor-echarts'
						if (id.includes('monaco-editor')) return 'vendor-monaco'
						return 'vendor'
					}
					// 路由级分割
					if (id.includes('/src/views/')) {
						return id.split('/src/views/')[1].split('/')[0]
					}
				},
				// 哈希策略优化
				entryFileNames: 'assets/[name]-[hash:8].js',
				chunkFileNames: 'assets/[name]-[hash:8].js',
				assetFileNames: 'assets/[name]-[hash:8].[ext]'
			}
		},
		reportCompressedSize: false // 禁用过时的体积报告
	},
	optimizeDeps: {
		include: ['vue', 'vue-router', 'pinia'],
		exclude: ['vue-demi'],
		esbuildOptions: {
			target: 'es2022' // 预构建目标
		}
	},
	plugins: [
		vue(),
		vueDevTools(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		createStyleImportPlugin({
			resolves: [ElementPlusResolve()],
			libs: [
				{
					libraryName: 'element-plus',
					esModule: true,
					resolveStyle: (name: string) => {
						return `element-plus/theme-chalk/${name}.css`
					}
				}
			]
		}),
		viteMockServe({
			mockPath: './src/mock', // 设置模拟.ts 文件的存储文件夹
			localEnabled: true, // 开发环境启用
			prodEnabled: false, // 生产环境禁用
			injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
			logger: true // 是否显示请求日志
		}),
		visualizer({
			open: true,
			template: 'sunburst', // 可视化图表类型
			gzipSize: true,
			brotliSize: true
		}),
		checker({
			typescript: true, // 类型检查
			eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' }
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
