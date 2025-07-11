import { defineStore, createPinia } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/cookies";
import { ElMessage } from "element-plus";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export const useUserStore = defineStore({
  id: "UserStore",
  state: (): any => ({
    token: getToken() || "",
    userInfo: {
      accountNo: ""
    },
    companyAreaId: "",
    loginConfigInfo: {}
  }),
  getters: {},
  actions: {
    async setToken(token: string) {
      this.token = token;
      setToken(this.token);
    },
    retToken() {
      this.token = "";
      removeToken();
      const router = useRouter();
      setTimeout(() => {
        router.replace("/login");
      }, 50);
      ElMessage.success("退出登录成功！");
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("UserStore")
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
