<template>
  <el-dropdown trigger="click" :teleported="false">
    <el-button size="small" type="primary">
      <span>更多</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon>刷新
        </el-dropdown-item>
        <el-dropdown-item @click="maximize">
          <el-icon><FullScreen /></el-icon>最大化
        </el-dropdown-item>
        <el-dropdown-item divided @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>关闭当前
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon>关闭其它
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon><FolderDelete /></el-icon>关闭所有
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { HOME_URL } from "@/config/config";
import { GlobalStore } from "@/stores";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = GlobalStore();
const keepAliveStore = useKeepAliveStore();
const themeConfig = computed(() => globalStore.themeConfig);
const refreshCurrentPage: Function = inject("refresh") as Function;
// refresh current page
const refresh = () => {
  keepAliveStore.removeKeepAliveName(route.name as string);
  refreshCurrentPage();
};

// maximize current page
const maximize = () => {
  globalStore.setThemeConfig({ ...themeConfig.value, maximize: true });
};

// Close Current
const closeCurrentTab = () => {
  if (route.meta.isAffix) return;
  tabStore.removeTabs(route.fullPath);
  keepAliveStore.removeKeepAliveName(route.name as string);
};

// Close Other
const closeOtherTab = () => {
  tabStore.closeMultipleTab(route.fullPath);
  keepAliveStore.setKeepAliveName([route.name] as string[]);
};

// Close All
const closeAllTab = () => {
  tabStore.closeMultipleTab();
  keepAliveStore.setKeepAliveName();
  router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
