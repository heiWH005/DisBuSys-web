import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/stores/interface";
import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/routers/index";
import { useKeepAliveStore } from "./keepAlive";

const keepAliveStore = useKeepAliveStore();
const MPID = import.meta.env.VITE_APP_PROJECT_TITLE;
const persistName = "TabsState_" + MPID;
// TabsStore
export const useTabsStore = defineStore({
  id: "TabsState",
  state: (): TabsState => ({
    tabsMenuList: []
  }),
  actions: {
    // Add Tabs
    async addTabs(tabItem: TabsMenuProps) {
      // 详情页
      if (tabItem.path.indexOf("id=") == -1 && tabItem.title === "详情") {
        tabItem.title = "新增";
      }
      if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
      if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
        keepAliveStore.addKeepAliveName(tabItem.name);
      }
    },
    // Remove Tabs
    async removeTabs(tabPath: string, isCurrent: boolean = true) {
      const tabsMenuList = this.tabsMenuList;
      if (isCurrent) {
        tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      console.log(tabsMenuValue);
      this.tabsMenuList = this.tabsMenuList.filter(item => {
        return item.path === tabsMenuValue || !item.close;
      });
      console.log(this.tabsMenuList);
    },
    // Set Tabs
    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList;
    },
    // Set Tabs Title
    async setTabsTitle(title: string) {
      const nowFullPath = location.hash.substring(1);
      this.tabsMenuList.forEach(item => {
        if (item.path == nowFullPath) item.title = title;
      });
    }
  }
  // persist: piniaPersistConfig(persistName)
});
