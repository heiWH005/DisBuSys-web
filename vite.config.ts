import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import importToCDN from "vite-plugin-cdn-import";
import AutoImport from "unplugin-auto-import/vite";
import { webUpdateNotice } from "@plugin-web-update-notification/vite";
import pkg from "./package.json";
import dayjs from "dayjs";

const lifecycle = process.env.npm_lifecycle_event;
const Version = new Date().getTime() + "v=1.0.0";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
// 获取base path
const getBasePath = () => {
	return process.env.VITE_YOUDIAN_ENV ? process.env.VITE_YOUDIAN_CDN : "./";
};
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		define: {
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
						__APP_INFO__: JSON.stringify(__APP_INFO__)
		},
		base: getBasePath(),
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`
				}
			}
		},
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// 跨域代理配置
			proxy: {
				"/map": {
					target: "https://apis.map.qq.com", // baseUrl
					changeOrigin: true, // 支持跨域
					rewrite: path => path.replace(/^\/map/, "")
				}
			}
		},
		plugins: [
			vue(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]"
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * vite 可以使用 jsx/tsx 语法
			vueJsx(),
			// * name 可以写在 script 标签上
			VueSetupExtend(),
			// * 是否生成包预览(分析依赖包大小,方便做优化处理)
			viteEnv.VITE_REPORT && visualizer(),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				}),
			// * cdn 引入（vue按需引入会导致依赖vue的插件出现问题(列如:pinia/vuex)）
			importToCDN({
				modules: [
					// {
					// 	name: "vue",
					// 	var: "Vue",
					// 	path: "https://unpkg.com/vue@next"
					// },
					// 使用cdn引入element-plus时,开发环境还是需要在main.js中引入element-plus,可以不用引入css
					// {
					// 	name: "element-plus",
					// 	var: "ElementPlus",
					// 	path: "https://unpkg.com/element-plus",
					// 	css: "https://unpkg.com/element-plus/dist/index.css"
					// }
				]
			}),
			// * demand import element
			AutoImport({
				imports: ["vue", "vue-router"]
			}),
			webUpdateNotice({
				versionType: "build_timestamp",
				injectFileBase: "./",
				notificationProps: {
					title: "🔊 系统升级通知",
					description: "检测到当前系统版本已更新，请刷新页面后使用",
					buttonText: "刷新",
					dismissButtonText: "忽略"
				}
			}),
			lifecycle === "report" ? visualizer({ open: true, brotliSize: true, filename: "report.html" }) : null
		],
		// * 打包去除 console.log && debugger
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		build: {
			outDir: "dist",
			minify: "esbuild",
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					chunkFileNames: `assets/js/[name]-[hash]-${Version}.js`,
					entryFileNames: `assets/js/[name]-[hash]-${Version}.js`,
					assetFileNames: `assets/[ext]/[name]-[hash]-${Version}.[ext]`,
					manualChunks: {
						vendor: ["vue"],
						eleVendor: ["element-plus"]
					}
				}
			}
		}
	};
});
