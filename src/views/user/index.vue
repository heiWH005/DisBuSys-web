<template>
  <IndexPagePro>
    <template #searchForm>
      <searchForm :search-param="searchParam" :columns="columns" :search="search" :reset="reset"> </searchForm>
    </template>
    <ProTable :columns="tableColumns" :data="tableData" :loading="loading" element-loading-text="正在加载中...">
      <template #tableHeader></template>
      <template #toolButton>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" link @click="handleEdit(scope.row)">更新</el-button>
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
      <UserAddOrUpdateDialog
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
import useUserHook from "./components/useUserHook";
import { useHandleData } from "@/hooks/useHandleData";
import { useTable } from "@/hooks/useTable";
import { getUserList, saveOrUpdateUser } from "@/api/modules/common";
import UserAddOrUpdateDialog from "./components/UserAddOrUpdateDialog.vue";
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
} = useTable(getUserList);
const { columns, tableColumns } = useUserHook();

const dialogVisible = ref(false);
const dialogTitle = ref("新增用户");
const dialogLoading = ref(false);
const currentItem = ref<any>({
  id: "",
  name: "",
  email: "",
  password: "",
  isDistributor: "1",
  levelNumber: "",
  parentId: ""
});

// 新增
const handleAdd = () => {
  dialogTitle.value = "新增用户";
  currentItem.value = {
    id: "",
    name: "",
    email: "",
    password: "",
    isDistributor: "1",
    levelNumber: "",
    parentId: ""
  };
  dialogVisible.value = true;
};

// 编辑
const handleEdit = row => {
  dialogTitle.value = "编辑用户";
  currentItem.value = {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    isDistributor: row.isDistributor,
    levelNumber: row.levelNumber,
    parentId: row.parentId
  };
  dialogVisible.value = true;
};

// 弹窗确认
const handleSubmit = async (params: any) => {
  dialogLoading.value = true;
  try {
    dialogLoading.value = false;
    let res = await saveOrUpdateUser(params);
    if (res.code === 200) {
      ElMessage.success(params.id ? "更新成功" : "新增成功");
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
  getTableList();
});
</script>
