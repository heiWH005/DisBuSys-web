<template>
  <div class="not-container">
    <img src="@/assets/images/404.png" class="not-img" alt="404" />
    <div class="not-detail">
      <h2>404</h2>
      <h4>无该页面访问权限～</h4>
      <el-button type="primary" @click="router.push(HOME_URL)">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="404">
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";
import { useUserStore } from "@/stores/modules/user";
const userStore = useUserStore();
const router = useRouter();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
