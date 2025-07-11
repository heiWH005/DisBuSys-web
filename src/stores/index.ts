import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProps, AssemblySizeType } from "./interface";
import { DEFAULT_PRIMARY } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const MPID = import.meta.env.VITE_APP_PROJECT_TITLE;
const persistName = "GlobalState_" + MPID;
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "GlobalState",
  // state: 返回对象的函数
  state: (): GlobalState => ({
    // token
    token: "",
    // userInfo
    userInfo: "",
    // element组件大小
    assemblySize: "default",
    // language
    language: "",
    // themeConfig
    themeConfig: {
      // 当前页面是否全屏
      maximize: false,
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: "vertical",
      // 默认 primary 主题颜色
      primary: DEFAULT_PRIMARY,
      // 深色模式
      isDark: false,
      // 灰色模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 折叠菜单
      isCollapse: false,
      // 面包屑导航
      breadcrumb: true,
      // 面包屑导航图标
      breadcrumbIcon: false,
      // 标签页
      tabs: true,
      // 标签页图标
      tabsIcon: true,
      // 页脚
      footer: false
    },
    // 活动类型
    typeAllList: [],
    // 登录配置信息
    loginConfigInfo: {}
  }),
  getters: {},
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token;
    },
    // setUserInfo
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    // setAssemblySizeSize
    setAssemblySizeSize(assemblySize: AssemblySizeType) {
      this.assemblySize = assemblySize;
    },
    // updateLanguage
    updateLanguage(language: string) {
      this.language = language;
    },
    // setThemeConfig
    setThemeConfig(themeConfig: ThemeConfigProps) {
      this.themeConfig = themeConfig;
    },
    set setTypeAllList(typeAllList: Array<any>) {
      this.typeAllList = typeAllList;
    }
  },
  persist: piniaPersistConfig(persistName)
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
