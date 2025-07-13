<template>
  <el-dialog v-model="dialogVisble" width="600px" :title="props.title" :before-close="handleClose">
    <div class="content">
      <el-form ref="formRef" :model="form" label-width="auto" :rules="labelRules">
        <el-form-item label="名字:" prop="name">
          <el-input v-model="form.name" placeholder="请输入名字" />
        </el-form-item>
        <el-form-item label="账号:" prop="email">
          <el-input v-model="form.email" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="是否分销员:" prop="isDistributor">
          <el-radio-group v-model="form.isDistributor">
            <el-radio label="是" :value="1" />
            <el-radio label="否" :value="0" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分销员等级:" prop="levelNumber">
          <el-select v-model="form.levelNumber" placeholder="请选择分销员等级">
            <el-option v-for="item in levelList" :key="item.levelNumber" :label="item.levelName" :value="item.levelNumber" />
          </el-select>
        </el-form-item>
        <el-form-item label="上级分销员:" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级分销员">
            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button type="primary" :loading="dialogLoading" @click="handleConfirm(formRef)">确认</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import { useAuthStore } from "@/stores/modules/auth";
import { getUserList } from "@/api/modules/common";

interface Props {
  visible: boolean;
  title: string;
  value: any;
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: "",
  value: {}
});
const authStore = useAuthStore();
const authCommonParams = computed(() => authStore.commonParams);
const levelList = computed(() => authCommonParams.value.levelList); // 分销员等级列表
const emit = defineEmits(["update:visible", "update:value", "submit", "update:loading"]);
const labelRules = ref({
  name: [
    { required: true, message: "请输入名字", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  email: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
  ],
  isDistributor: [{ required: true, message: "请选择是否为分销员", trigger: "change" }],
  levelNumber: [{ required: true, message: "请选择分销员等级", trigger: "change" }],
  parentId: [{ required: false, message: "请选择上级分销员", trigger: "change" }]
});
const userList = ref([]); // 用户列表
const formRef = ref<FormInstance>(null);
const form = computed({
  get: () => {
    return handleImgAndCites(props.value);
  },
  set: value => {
    emit("update:value", value);
  }
});
const dialogVisble = computed({
  get: () => props.visible,
  set: value => {
    emit("update:visible", value);
  }
});
const dialogLoading = computed({
  get: () => props.loading,
  set: value => {
    emit("update:loading", value);
  }
});
const handleImgAndCites = (form: any) => {
  let formCopy = form;
  return formCopy;
};

// 处理表单赋值
const handleBaseForm = () => {
  let formCopy = JSON.parse(JSON.stringify(form.value));
  return formCopy;
};

// 关闭表单
const handleClose = () => {
  emit("update:visible", false);
};
// 提交
const handleConfirm = async (formEl: FormInstance | undefined) => {
  formEl.validate(async (valid, fields) => {
    if (valid) {
      let formCopy = handleBaseForm();
      emit("update:value", formCopy);
      emit("submit", formCopy);
    }
  });
};

// 获取用户列表
const getUserListApi = async () => {
  const res = await getUserList({ pageNum: 1, pageSize: 1000 });
  if (res.code === 200) {
    userList.value = res.data.dataList;
  }
};
onMounted(() => {
  getUserListApi();
});
</script>

<style lang="scss" scoped></style>
