<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <ThemeSetting id="themeSetting" />
      <Fullscreen id="fullscreen" />
    </div>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import Fullscreen from "./components/Fullscreen.vue";
import Message from "./components/Message.vue";
import { useUserStore } from "@/stores/modules/user";
import ThemeSetting from "./components/ThemeSetting.vue";
import Avatar from "./components/Avatar.vue";
import { computed } from "@vue/reactivity";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
</script>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px 0 0;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
  }
}
</style>
