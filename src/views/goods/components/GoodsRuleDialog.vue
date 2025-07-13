<template>
  <el-dialog :title="title" v-model="dialogVisible" width="500px" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="商品编号" prop="serialNo">
        <el-input v-model="formData.serialNo" placeholder="请输入商品编号" disabled />
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入商品名称" disabled />
      </el-form-item>
      <el-form-item label="分账方式" prop="commissionType">
        <el-input v-model="formData.commissionType" placeholder="请输入分账方式" disabled />
      </el-form-item>
      <el-form-item label="层级" prop="levelNumber">
        <el-select v-model="formData.levelNumber" placeholder="请选择层级" class="w-full">
          <el-option v-for="item in levelList" :key="item.levelNumber" :label="item.levelName" :value="item.levelNumber" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="比例"
        prop="commissionPercentage"
        v-if="formData.commissionType === 'PERCENT_PROFIT' || formData.commissionType === 'PERCENT_SALE'"
      >
        <el-input-number
          v-model="formData.commissionPercentage"
          placeholder="请输入比例"
          :min="0"
          :max="100"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="固定金额" prop="fixedCommissionAmount" v-if="formData.commissionType === 'FIXED'">
        <el-input-number v-model="formData.fixedCommissionAmount" placeholder="请输入固定金额" :min="0" style="width: 200px" />
      </el-form-item>
      <el-form-item label="利润" prop="profit">
        <el-input v-model="formData.profit" placeholder="请输入利润" disabled />
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
import { useAuthStore } from "@/stores/modules/auth";

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
      serialNo: "",
      name: "",
      levelNumber: "",
      commissionPercentage: "",
      fixedCommissionAmount: "",
      profit: ""
    })
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:visible", "update:value", "submit"]);
const authStore = useAuthStore();
const commonParams = computed(() => authStore.commonParams);

const levelList = computed(() => {
  return commonParams.value.levelList;
});
const dialogVisible = computed({
  get: () => props.visible,
  set: val => emit("update:visible", val)
});

const formRef = ref<FormInstance>();
const formData = ref(props.value);

// 表单校验规则
const rules = ref<FormRules>({
  serialNo: [{ required: true, message: "请输入商品编号", trigger: "blur" }],
  name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  levelNumber: [{ required: true, message: "请选择层级", trigger: "change" }],
  commissionPercentage: [{ required: true, message: "请输入比例", trigger: "blur" }],
  fixedCommissionAmount: [{ required: true, message: "请输入固定金额", trigger: "blur" }]
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
