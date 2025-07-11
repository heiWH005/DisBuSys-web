<template>
  <IndexPagePro>
    <template #searchForm>
      <searchForm :search-param="searchParam" :columns="columns" :search="search" :reset="reset"> </searchForm>
    </template>
    <ProTable :columns="tableColumns" :data="tableData" :loading="loading" element-loading-text="正在加载中...">
      <template #tableHeader></template>
      <template #toolButton> </template>
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
    <template #dialog> </template>
  </IndexPagePro>
</template>

<script lang="ts" setup>
import IndexPagePro from "@/components/UIBaseLayout/IndexPagePro.vue";
import searchForm from "@/components/SearchForm/index.vue";
import ProTable from "@/components/ProTable/index.vue";
import useSplitAccountHook from "./components/useSplitAccountHook";
import { useHandleData } from "@/hooks/useHandleData";
import { useTable } from "@/hooks/useTable";
import { getCommissionLedgerList } from "@/api/modules/common";
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
} = useTable(getCommissionLedgerList);
const { columns, tableColumns } = useSplitAccountHook();

onMounted(() => {
  getTableList();
});
</script>
