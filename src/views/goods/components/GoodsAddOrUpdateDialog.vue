<template>
  <el-dialog v-model="dialogVisble" width="600px" :title="props.title" :before-close="handleClose">
    <div class="content">
      <el-form ref="formRef" :model="form" label-width="auto" :rules="labelRules">
        <el-form-item label="商品编号" prop="serialNo" v-if="form.id">
          <el-input v-model="form.serialNo" placeholder="请输入商品编号" disabled />
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="分账方式" prop="commissionType">
          <el-select v-model="form.commissionType" placeholder="请选择分账方式">
            <el-option v-for="item in productCommissionTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择商品类型">
            <el-option v-for="item in productTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="利润" prop="profit" v-if="form.commissionType === 'PERCENT_PROFIT'">
          <el-input-number v-model="form.profit" :min="0" placeholder="请输入利润" style="width: 200px" />
          <span style="margin-left: 10px"> % </span>
        </el-form-item>
        <el-form-item label="最多分配层级" prop="maxDistributionLevels">
          <el-input-number
            v-model="form.maxDistributionLevels"
            :min="1"
            :max="10"
            :step="1"
            placeholder="请输入最多分配层级"
            style="width: 200px"
          />
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
  name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择商品类型", trigger: "change" }],
  commissionType: [{ required: true, message: "请选择分账方式", trigger: "change" }],
  profit: [{ required: true, message: "请输入利润", trigger: "blur" }],
  maxDistributionLevels: [{ required: true, message: "请输入最多分配层级", trigger: "blur" }]
});
const formRef = ref<FormInstance>(null);
const authStore = useAuthStore();
const productTypeList = computed(() => {
  if (!authStore.commonParams.productTypeList) return [];
  return authStore.commonParams.productTypeList.map(item => {
    return {
      label: item,
      value: item
    };
  });
}); // 商品类型
const productCommissionTypeList = computed(() => {
  if (!authStore.commonParams.productCommissionTypeList) return [];
  return authStore.commonParams.productCommissionTypeList.map(item => {
    return {
      label: item,
      value: item
    };
  });
}); // 分账方式
const form = computed({
  get: () => {
    return handleProps(props.value);
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
const handleProps = (form: any) => {
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
