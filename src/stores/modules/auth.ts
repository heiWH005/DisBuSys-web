import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from "@/utils";
import baseRoute from "@/routers/modules/baseRoute";
import { getInitParams } from "@/api/modules/common";

export const useAuthStore = defineStore({
  id: "geeker-auth",
  state: (): any => ({
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: "",
    // 下拉公共参数
    commonParams: {},
    initParams: false
  }),
  getters: {
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    // Get AuthMenuList
    async getAuthMenuList() {
      this.authMenuList = baseRoute;
    },
    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name;
    },
    // Set CommonParams
    async setCommonParams(params: any) {
      this.commonParams = params;
    },
    // Get CommonParams
    async getCommonParams() {
      const res = await getInitParams({});
      if (res.code === 200) {
        this.commonParams = res.data;
        this.initParams = true;
      }
    }
  }
});
