import dayjs from "dayjs";
const useGoodsHook = () => {
  const columns = ref([
    {
      prop: "name",
      label: "商品名称",
      search: { el: "input", placeholder: "请输入商品名称" }
    }
  ]);
  const progressList = ref([]);
  const checkDialogVisble = ref(false);
  const handleCloseDialog = () => {
    checkDialogVisble.value = false;
  };

  const tableColumns = ref<any>([
    {
      type: "index",
      label: "序号",
      width: 70,
      fixed: "left"
    },
    {
      prop: "serialNo",
      label: "商品编号",
      minWidth: 120,
      align: "center"
    },
    {
      prop: "name",
      label: "商品名字",
      minWidth: 180,
      align: "center"
    },
    {
      prop: "type",
      label: "类型",
      minWidth: 180,
      align: "center"
    },
    {
      prop: "commissionType",
      label: "分账方式",
      minWidth: 180,
      align: "center"
    },
    {
      prop: "profit",
      label: "利润",
      width: 100
    },
    {
      prop: "maxDistributionLevels",
      label: "最多分配层级",
      minWidth: 180,
      align: "center"
    },
    {
      prop: "updatedAt",
      label: "修改时间",
      minWidth: 180,
      align: "center"
    },
    { label: "操作", prop: "operation", fixed: "right", width: 200, align: "center" }
  ]);

  const paramCallBack = data => {
    return data;
  };
  const dataCallBack = data => {
    data.dataList.forEach(item => {
      item.updatedAt = item.updatedAt ? dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : "";
    });
    return data;
  };

  return {
    columns,
    tableColumns,
    dataCallBack,
    paramCallBack,
    checkDialogVisble,
    handleCloseDialog,
    progressList
  };
};
export default useGoodsHook;
