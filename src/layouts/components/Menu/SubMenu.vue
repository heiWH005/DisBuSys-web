<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 1" :index="subItem.path">
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
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
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
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps<{ menuList: Menu.MenuOptions[] }>();
const router = useRouter();
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

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-color-primary) !important;
    background-color: var(--el-color-primary-light-9) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
</style>
