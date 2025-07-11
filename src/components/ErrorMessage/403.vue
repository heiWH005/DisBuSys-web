<template>
  <div class="not-container">
    <img src="@/assets/images/403.png" class="not-img" alt="403" />
    <div class="not-detail">
      <h2>403</h2>
      <h4>抱歉，您无权访问该应用~🙅‍♂️🙅‍♀️</h4>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="403">
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";
import { useUserStore } from "@/stores/modules/user";
const router = useRouter();
const userStore = useUserStore();
const goHome = () => {
  userStore.retToken();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
