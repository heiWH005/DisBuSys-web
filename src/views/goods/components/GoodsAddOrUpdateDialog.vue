<template>
  <el-dialog v-model="dialogVisble" width="600px" :title="props.title" :before-close="handleClose">
    <div class="content">
      <el-form ref="formRef" :model="form" label-width="auto" :rules="labelRules">
        <el-form-item label="商品编号" prop="goodsNo">
          <el-input v-model="form.goodsNo" placeholder="请输入商品编号" />
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="form.goodsName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品类型" prop="goodsType">
          <el-select v-model="form.goodsType" placeholder="请选择商品类型">
            <el-option label="实物商品" value="physical" />
            <el-option label="虚拟商品" value="virtual" />
          </el-select>
        </el-form-item>
        <el-form-item label="分账方式" prop="profitType">
          <el-select v-model="form.profitType" placeholder="请选择分账方式">
            <el-option label="按比例分账" value="percentage" />
            <el-option label="按金额分账" value="fixed" />
          </el-select>
        </el-form-item>
        <el-form-item label="利润" prop="profit">
          <el-input-number v-model="form.profit" :min="0" :precision="2" :step="0.1" placeholder="请输入利润" />
        </el-form-item>
        <el-form-item label="最多分配层级" prop="maxLevel">
          <el-input-number v-model="form.maxLevel" :min="1" :max="10" :step="1" placeholder="请输入最多分配层级" />
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
  name: [
    { required: true, message: "请输入名字", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  account: [
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
