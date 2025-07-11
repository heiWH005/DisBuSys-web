<template>
  <el-dialog :title="title" v-model="dialogVisible" width="500px" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="规则名称" prop="ruleName">
        <el-input v-model="formData.ruleName" placeholder="请输入规则名称" />
      </el-form-item>
      <el-form-item label="规则类型" prop="ruleType">
        <el-select v-model="formData.ruleType" placeholder="请选择规则类型" class="w-full">
          <el-option label="类型1" value="1" />
          <el-option label="类型2" value="2" />
          <el-option label="类型3" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="规则值" prop="ruleValue">
        <el-input v-model="formData.ruleValue" type="textarea" :rows="3" placeholder="请输入规则值" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "新增规则"
  },
  value: {
    type: Object,
    default: () => ({
      id: "",
      ruleName: "",
      ruleType: "",
      ruleValue: ""
    })
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:visible", "update:value", "submit"]);

const dialogVisible = computed({
  get: () => props.visible,
  set: val => emit("update:visible", val)
});

const formRef = ref<FormInstance>();
const formData = ref(props.value);

// 表单校验规则
const rules = ref<FormRules>({
  ruleName: [
    { required: true, message: "请输入规则名称", trigger: "blur" },
    { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
  ],
  ruleType: [{ required: true, message: "请选择规则类型", trigger: "change" }],
  ruleValue: [{ required: true, message: "请输入规则值", trigger: "blur" }]
});

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      emit("submit", formData.value);
    }
  });
};

// 监听value变化
watch(
  () => props.value,
  newVal => {
    formData.value = { ...newVal };
  },
  { deep: true }
);
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.w-full {
  width: 100%;
}
</style>
