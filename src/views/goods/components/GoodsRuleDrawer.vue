<template>
  <el-drawer v-model="drawerVisible" :title="title" size="50%">
    <div class="rule-table-container">
      <div class="table-header">
        <el-button type="primary" @click="handleAdd">新增规则</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading" element-loading-text="正在加载中..." :border="true">
        <el-table-column prop="serialNo" label="商品编号" width="180" />
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="levelNumber" label="层级" width="180" />
        <el-table-column prop="commissionPercentage" label="比例" width="180" />
        <el-table-column prop="fixedCommissionAmount" label="固定金额" width="180" />
        <el-table-column prop="profit" label="利润" width="180" />
        <!-- <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
        <template #empty>
          <div class="table-empty">
            <slot name="empty">
              <img src="@/assets/images/notData.png" alt="notData" />
              <div>暂无数据</div>
            </slot>
          </div>
        </template>
      </el-table>
      <div class="pagination-container"></div>
    </div>

    <GoodsRuleDialog
      v-model:visible="ruleDialogVisible"
      v-model:value="currentRule"
      v-model:loading="ruleDialogLoading"
      :title="ruleDialogTitle"
      @submit="handleRuleSubmit"
    />
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useTable } from "@/hooks/useTable";
import { ElMessage } from "element-plus";
import GoodsRuleDialog from "./GoodsRuleDialog.vue";
import { getProductRuleList, saveOrUpdateProductRule } from "@/api/modules/common";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  goodsId: {
    type: [String, Number],
    default: ""
  },
  title: {
    type: String,
    default: "规则列表"
  },
  goodsInfo: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(["update:visible"]);
const tableData = ref([]);
const loading = ref(false);
const drawerVisible = computed({
  get: () => props.visible,
  set: val => emit("update:visible", val)
});

const getTableList = async () => {
  loading.value = true;
  const res = await getProductRuleList({ productId: props.goodsId });
  if (res.code === 200) {
    tableData.value = res.data.dataList;
    loading.value = false;
  }
};

// 规则弹窗相关
const ruleDialogVisible = ref(false);
const ruleDialogTitle = ref("新增规则");
const ruleDialogLoading = ref(false);
const currentRule = ref({
  productId: "",
  serialNo: "",
  name: "",
  levelNumber: "",
  commissionPercentage: 0,
  fixedCommissionAmount: 0,
  profit: "",
  commissionType: "",
  type: ""
});

// 新增规则
const handleAdd = () => {
  ruleDialogTitle.value = "新增规则";
  currentRule.value = {
    productId: props.goodsInfo.id,
    serialNo: props.goodsInfo.serialNo,
    name: props.goodsInfo.name,
    levelNumber: "",
    commissionPercentage: 0,
    fixedCommissionAmount: 0,
    profit: props.goodsInfo.profit,
    commissionType: props.goodsInfo.commissionType,
    type: props.goodsInfo.type
  };
  ruleDialogVisible.value = true;
};

// 编辑规则
const handleEdit = (row: any) => {
  ruleDialogTitle.value = "编辑规则";
  currentRule.value = { ...row };
  ruleDialogVisible.value = true;
};

// 删除规则
const handleDelete = async (row: any) => {
  // TODO: 实现删除规则逻辑
};

// 提交规则
const handleRuleSubmit = async (formData: any) => {
  ruleDialogLoading.value = true;
  try {
    const res = await saveOrUpdateProductRule(formData);
    if (res.code === 200) {
      ElMessage.success(formData.id ? "更新成功" : "新增成功");
    } else {
      ElMessage.error(res.message);
    }
    ruleDialogVisible.value = false;
    getTableList();
  } catch (error) {
    console.error(error);
  } finally {
    ruleDialogLoading.value = false;
  }
};

// 监听goodsId变化，重新获取列表
watch(
  () => props.goodsId,
  newVal => {
    if (newVal) {
      console.log("newVal", newVal);
      getTableList();
    }
  }
);

// 初始化
onMounted(() => {
  if (props.goodsId) {
    getTableList();
  }
});
</script>

<style scoped>
.rule-table-container {
  padding: 20px;
}

.table-header {
  margin-bottom: 16px;
}

.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

::v-deep(.el-table) {
  .table-empty {
    padding: 30px 0;
  }
}
</style>
