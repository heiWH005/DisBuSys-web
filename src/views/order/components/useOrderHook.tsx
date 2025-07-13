import dayjs from "dayjs";
const useOrderHook = () => {
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
      label: "用户名称",
      search: { el: "input", placeholder: "请输入用户名称" }
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
      prop: "orderNumber",
      label: "订单编号",
      align: "center",
      minWidth: 120
    },
    {
      prop: "externalOrderId",
      label: "外部订单编号",
      align: "center",
      minWidth: 120
    },
    {
      prop: "type",
      label: "商品类型",
      align: "center",
      minWidth: 100
    },
    {
      prop: "totalAmount",
      label: "金额",
      align: "center",
      minWidth: 100
    },
    {
      prop: "buyerId",
      label: "购买人id",
      align: "center",
      minWidth: 100
    },
    {
      prop: "buyerName",
      label: "购买人名称",
      align: "center",
      minWidth: 100
    },
    {
      prop: "receiveAddress",
      label: "地址",
      align: "center",
      minWidth: 100
    },
    {
      prop: "updatedAt",
      label: "修改时间",
      align: "center",
      minWidth: 120
    }
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
export default useOrderHook;
