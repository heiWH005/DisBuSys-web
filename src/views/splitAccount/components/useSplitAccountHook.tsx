const useUserHook = () => {
  const columns = ref([
    {
      prop: "orderNumber",
      label: "订单编号",
      search: { el: "input", placeholder: "请输入订单编号" }
    },
    {
      prop: "externalOrderId",
      label: "外部订单编号",
      search: { el: "input", placeholder: "请输入外部订单编号" }
    },
    {
      prop: "userName",
      label: "订单状态",
      search: { el: "input", placeholder: "请输入订单状态" }
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
    { label: "订单编号", prop: "orderNumber", align: "center", minWidth: 120 },
    { label: "外部订单编号", prop: "externalOrderId", align: "center", minWidth: 120 },
    { label: "用户id", prop: "userId", align: "center", minWidth: 100 },
    { label: "用户名称", prop: "userName", align: "center", minWidth: 100 },
    { label: "金额", prop: "amount", align: "center", minWidth: 100 },
    { label: "分账明细", prop: "description", align: "center", minWidth: 120 },
    { label: "修改时间", prop: "updatedAt", align: "center", minWidth: 120 }
  ]);

  const paramCallBack = data => {
    return data;
  };
  const dataCallBack = data => {
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
export default useUserHook;
