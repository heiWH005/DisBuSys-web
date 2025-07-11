import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark(自定义暗黑模式)
import "@/styles/theme/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// plugin-web-update-notice
import "@/styles/pluginUpdate.scss";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers/index";
// pinia store
import pinia from "@/stores/index";
// svg icons
import "virtual:svg-icons-register";
// errorHandler
import errorHandler from "@/utils/errorHandler";
// svg icons
import "virtual:svg-icons-register";
import svgIcon from "@/components/SvgIcon/index.vue";
// 解决谷歌浏览器警告
import "default-passive-events";
// dayjs
import dayjs from "dayjs";

const app = createApp(App);

app.config.errorHandler = errorHandler;

app.config.globalProperties.$dayjs = dayjs;
app.component("SvgIcon", svgIcon);
// 注册element Icons组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router).use(pinia).use(directives).use(ElementPlus).mount("#app");
