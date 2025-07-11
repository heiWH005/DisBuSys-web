<template>
  <IndexPagePro>
    <template #searchForm>
      <searchForm :search-param="searchParam" :columns="columns" :search="search" :reset="reset"> </searchForm>
    </template>
    <ProTable :columns="tableColumns" :data="tableData" :loading="loading" element-loading-text="正在加载中...">
      <template #tableHeader></template>
      <template #operation="scope">
        <el-button type="primary" link @click="handleCheck(scope.row)">审核</el-button>
      </template>
    </ProTable>
    <template #pagination>
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
    </template>
    <template #dialog>
      <CheckAddOrUpdateDialog
        v-model:visible="dialogVisible"
        v-model:value="currentItem"
        v-model:loading="dialogLoading"
        @submit="handleSubmit"
        :title="dialogTitle"
      />
    </template>
  </IndexPagePro>
</template>

<script lang="ts" setup>
import IndexPagePro from "@/components/UIBaseLayout/IndexPagePro.vue";
import searchForm from "@/components/SearchForm/index.vue";
import ProTable from "@/components/ProTable/index.vue";
import useWithdrawalReviewHook from "./components/useWithdrawalReviewHook";
import { useHandleData } from "@/hooks/useHandleData";
import { useTable } from "@/hooks/useTable";
import { getWithdrawalsList, withdrawals } from "@/api/modules/common";
import CheckAddOrUpdateDialog from "./components/CheckAddOrUpdateDialog.vue";
import { ElMessage } from "element-plus";

const {
  tableData,
  pageable,
  baseParam,
  searchParam,
  totalParam,
  pageParam,
  handleSizeChange,
  handleCurrentChange,
  getTableList,
  search,
  reset,
  loading
} = useTable(getWithdrawalsList);
const { columns, tableColumns } = useWithdrawalReviewHook();

const dialogVisible = ref(false);
const dialogTitle = ref("提现审核");
const dialogLoading = ref(false);
const currentItem = ref<any>({
  id: "",
  status: "",
  notes: ""
});

// 审核
const handleCheck = row => {
  dialogTitle.value = "提现审核";
  currentItem.value = {
    id: row.id,
    status: row.status,
    notes: row.notes
  };
  dialogVisible.value = true;
};

// 弹窗确认
const handleSubmit = async (params: any) => {
  dialogLoading.value = true;
  try {
    dialogLoading.value = false;
    let res = await withdrawals(params);
    if (res.code === 200) {
      ElMessage.success("操作成功");
      dialogVisible.value = false;
      getTableList();
    } else {
      ElMessage.warning(res.message);
    }
  } catch (error) {
    dialogLoading.value = false;
  }
};

onMounted(() => {
  searchParam.value.status = "pending";
  getTableList();
});
</script>
