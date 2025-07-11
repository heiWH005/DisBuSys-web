<template>
  <el-dialog v-model="dialogVisble" width="600px" :title="props.title" :before-close="handleClose">
    <div class="content">
      <el-form ref="formRef" :model="form" label-width="auto" :rules="labelRules">
        <el-form-item label="审核状态:" prop="status">
          <el-select v-model="form.status" placeholder="请选择审核状态">
            <el-option label="待审核" value="pending" />
            <el-option label="通过" value="pass" />
            <el-option label="驳回" value="reject" />
          </el-select>
        </el-form-item>
        <el-form-item label="原因:" prop="notes">
          <el-input v-model="form.notes" type="textarea" :rows="3" placeholder="请输入审核原因" maxlength="200" show-word-limit />
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

const emit = defineEmits(["update:visible", "update:value", "submit", "update:loading"]);
const labelRules = ref({
  status: [{ required: true, message: "请选择审核状态", trigger: "change" }],
  notes: [
    { required: true, message: "请输入审核原因", trigger: "blur" },
    { min: 2, max: 200, message: "长度在 2 到 200 个字符", trigger: "blur" }
  ]
});
const groupList = ref([]);
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
</script>

<style lang="scss" scoped></style>
