import { ref } from "vue";
import { useRoute } from "vue-router";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
/**
 * @description form 页面编辑新增
 * */
export const useFormEdit = () => {
  const userStore = useUserStore();
  const BaseCompanyAreaId = computed(() => {
    return userStore.companyAreaId;
  });
  const loading = ref(false);
  const ruleFormRef = ref<FormInstance>();
  const route = useRoute();
  const router = useRouter();
  const tabStore = useTabsStore();
  const keepAliveStore = useKeepAliveStore();
  const closeCurrent = (fullPath?: any, routeName?: any) => {
    if (fullPath) {
      tabStore.removeTabs(fullPath);
      keepAliveStore.removeKeepAliveName(routeName);
      return;
    }
    if (route.meta.isAffix) return;
    tabStore.removeTabs(route.fullPath);
    keepAliveStore.removeKeepAliveName(route.name as string);
    router.back();
  };
  const setTitle = (title: string) => {
    tabStore.setTabsTitle(title);
  };

  /**
   * @description 新增操作
   * @param {Function} api 操作数据接口的api方法(必传)
   * @param {Object} params 携带的操作数据参数 {id,params}(必传)
   * @param {String} message 提示信息(必传)
   * @param {String} confirmType icon类型(不必传,默认为 warning)
   * @return Promise
   */
  const addMethod = <P = any, R = any>(
    api?: (params: P) => Promise<R>,
    params?: Parameters<typeof api>[0],
    message: string = "新增成功"
  ) => {
    if (loading.value) {
      return;
    }
    return new Promise(async resolve => {
      let res: any = await api(params);
      if (res.code == 200) {
        ElMessage.success(message);
        resolve({ flag: true, ...res });
      } else {
        resolve({ flag: false, ...res });
      }
      loading.value = false;
    });
  };
  /**
   * @description 更新操作
   * @param {Function} api 操作数据接口的api方法(必传)
   * @param {Object} params 携带的操作数据参数 {id,params}(必传)
   * @param {String} message 提示信息(必传)
   * @param {String} confirmType icon类型(不必传,默认为 warning)
   * @return Promise
   */
  const updateMethod = <P = any, R = any>(
    api?: (params: P) => Promise<R>,
    params?: Parameters<typeof api>[0],
    message: string = "更新成功"
  ) => {
    if (loading.value) {
      return;
    }
    return new Promise(async resolve => {
      let res: any = await api(params);
      if (res.code == 200) {
        ElMessage.success(message);
        resolve({ flag: true, ...res });
      } else {
        resolve({ flag: false, ...res });
      }
      loading.value = false;
    });
  };
  return {
    BaseCompanyAreaId,
    closeCurrent,
    ruleFormRef,
    setTitle,
    addMethod,
    updateMethod,
    loading
  };
};
