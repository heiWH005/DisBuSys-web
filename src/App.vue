<template>
  <el-config-provider :locale="zhCn" :button="config" :size="assemblySize">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { GlobalStore } from "@/stores";
import { useTheme } from "@/hooks/useTheme";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

const globalStore = GlobalStore();
// 配置element按钮文字中间是否有空格
const config = reactive({
  autoInsertSpace: false
});

// 配置全局组件大小
const assemblySize = computed(() => globalStore.assemblySize);
</script>
