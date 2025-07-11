<template>
  <div class="name-box">
    <el-dropdown trigger="click">
      <span class="username">
        <span>
          {{ userInfo.accountNo }}
        </span>
        <el-icon>
          <CaretBottom />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">
            <el-icon> <SwitchButton /> </el-icon>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="avatar">
    <img :src="userInfo.avatar" v-if="userInfo.avatar" alt="avatar" />
    <img src="@/assets/images/avatar.gif" v-else alt="avatar" />
  </div>
  <!-- infoDialog -->
  <InfoDialog ref="infoRef"></InfoDialog>
  <!-- passwordDialog -->
  <PasswordDialog ref="passwordRef"></PasswordDialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { LOGIN_URL } from "@/config/config";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage, ElLoading } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
const router = useRouter();
const userStore = useUserStore();
const userInfo: any = computed(() => userStore.userInfo);
// 退出登录
const logout = () => {
  ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    userStore.retToken();
  });
};
const handleJump = () => {
  try {
  } catch (error) {
    console.error(error);
  }
};
interface DialogExpose {
  openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
// 打开修改密码和个人信息弹窗
const openDialog = (refName: string) => {
  if (refName == "infoRef") infoRef.value?.openDialog();
  else passwordRef.value?.openDialog();
};
onMounted(() => {});
</script>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}

.organ_unit_id_name {
  margin-left: 20px;
  font-size: 15px;
}
.name-box {
  display: flex;
  align-items: center;
  margin-left: 8px;
}
.accountName {
  font-size: 15px;
  color: var(--el-text-color-primary);
}

.username {
  margin-right: 20px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

:deep(.el-dropdown-menu__item).highlight {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}
</style>
