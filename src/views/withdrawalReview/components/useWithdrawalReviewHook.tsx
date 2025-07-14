import dayjs from "dayjs";
const useWithdrawalReviewHook = () => {
  const columns = ref([
    {
      prop: "userName",
      label: "用户名称",
      search: { el: "input", placeholder: "请输入用户名称" }
    },
    {
      prop: "status",
      label: "状态",
      enum: [
        {
          label: "PENDING",
          value: "PENDING"
        },
        {
          label: "APPROVED",
          value: "APPROVED"
        },
        {
          label: "REJECTED",
          value: "REJECTED"
        }
      ],
      search: { el: "select", placeholder: "请选择状态" }
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
      label: "提现编号",
      minWidth: 180
    },
    {
      prop: "userId",
      label: "用户ID",
      minWidth: 100
    },
    {
      prop: "userName",
      label: "用户名称",
      minWidth: 120
    },
    {
      prop: "amount",
      label: "提现金额",
      minWidth: 120
    },
    {
      prop: "status",
      label: "状态",
      minWidth: 100
    },
    {
      prop: "notes",
      label: "驳回原因",
      minWidth: 180
    },
    {
      prop: "requestedAt",
      label: "申请时间",
      minWidth: 180
    },
    {
      prop: "processedAt",
      label: "审批时间",
      minWidth: 180
    },

    { label: "操作", prop: "operation", fixed: "right", width: 200, align: "center" }
  ]);

  const paramCallBack = data => {
    return data;
  };
  const dataCallBack = data => {
    data.dataList.forEach(item => {
      item.requestedAt = dayjs(item.requestedAt).format("YYYY-MM-DD HH:mm:ss");
      item.processedAt = dayjs(item.processedAt).format("YYYY-MM-DD HH:mm:ss");
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
export default useWithdrawalReviewHook;
