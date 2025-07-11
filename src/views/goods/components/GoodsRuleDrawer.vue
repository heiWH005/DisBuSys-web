<template>
  <el-drawer v-model="drawerVisible" :title="title" size="50%">
    <div class="rule-table-container">
      <div class="table-header">
        <el-button type="primary" @click="handleAdd">新增规则</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading" element-loading-text="正在加载中..." :border="true">
        <el-table-column prop="ruleName" label="规则名称" width="180" />
        <el-table-column prop="ruleType" label="规则类型" width="120" />
        <el-table-column prop="ruleValue" label="规则值" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <template #empty>
          <div class="table-empty">
            <slot name="empty">
              <img src="@/assets/images/notData.png" alt="notData" />
              <div>暂无数据</div>
            </slot>
          </div>
        </template>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pageable.pageNum"
          v-model:page-size="pageable.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="total, sizes, prev, pager, next"
          :total="pageable.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
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
  }
});

const emit = defineEmits(["update:visible"]);

const drawerVisible = computed({
  get: () => props.visible,
  set: val => emit("update:visible", val)
});

// 使用表格Hook
const { tableData, pageable, handleSizeChange, handleCurrentChange, getTableList, loading } = useTable(async params => {
  // TODO: 替换为实际的获取规则列表API
  return {
    list: [],
    total: 0
  };
});

// 规则弹窗相关
const ruleDialogVisible = ref(false);
const ruleDialogTitle = ref("新增规则");
const ruleDialogLoading = ref(false);
const currentRule = ref({
  id: "",
  ruleName: "",
  ruleType: "",
  ruleValue: ""
});

// 新增规则
const handleAdd = () => {
  ruleDialogTitle.value = "新增规则";
  currentRule.value = {
    id: "",
    ruleName: "",
    ruleType: "",
    ruleValue: ""
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
    // TODO: 实现保存规则API
    ElMessage.success(formData.id ? "更新成功" : "新增成功");
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
