<!-- 横向布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="logo flx-center">
        <img src="@/assets/images/logo.svg" class="logo-img" alt="logo" />
        <span>{{ GLOBAL_TITLE }}</span>
      </div>
      <el-menu mode="horizontal" :default-active="activeMenu" :router="false" :unique-opened="true">
        <!-- 只有在这里写 submenu 才能触发 menu 三个点省略 -->
        <template v-for="subItem in menuList" :key="subItem.path">
          <el-sub-menu v-if="subItem.children?.length" :index="subItem.path" :key="subItem.path + 'el-sub-menu'">
            <template #title>
              <div v-if="subItem.meta.icon">
                <i class="el-icon" v-if="isSvgIcon(subItem.meta.icon)">
                  <SvgIcon :name="getSvgIcon(subItem.meta.icon)" :iconStyle="svgStyle" />
                </i>
                <el-icon v-else>
                  <component :is="subItem.meta.icon"></component>
                </el-icon>
              </div>
              <span>{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menuList="subItem.children" />
          </el-sub-menu>
          <el-menu-item v-else :index="subItem.path" :key="subItem.path + 'el-menu-item'" @click="handleClickMenu(subItem)">
            <div v-if="subItem.meta.icon">
              <i class="el-icon" v-if="isSvgIcon(subItem.meta.icon)">
                <SvgIcon :name="getSvgIcon(subItem.meta.icon)" :iconStyle="svgStyle" />
              </i>
              <el-icon v-else>
                <component :is="subItem.meta.icon"></component>
              </el-icon>
            </div>
            <template #title>
              <span>{{ subItem.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
      <ToolBarRight />
    </el-header>
    <Main />
  </el-container>
</template>

<script setup lang="ts" name="layoutTransverse">
import { computed } from "vue";
import { useAuthStore } from "@/stores/modules/auth";
import { useRoute, useRouter } from "vue-router";
import Main from "@/layouts/components/Main/index.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import { GLOBAL_TITLE } from "@/config/config";
import { useUserStore } from "@/stores/modules/user";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const menuList = computed(() => authStore.showMenuListGet);
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
const isSvgIcon = (icon: string) => {
  return icon.startsWith("svg-");
};
const getSvgIcon = (icon: string) => {
  return icon.replace(/^svg-/, "");
};
const svgStyle = ref({
  width: "30px",
  height: "30px"
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
