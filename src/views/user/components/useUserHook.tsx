const useUserHook = () => {
  const columns = ref([
    {
      prop: "name",
      label: "名字",
      search: { el: "input", placeholder: "请输入名字" }
    },
    {
      prop: "email",
      label: "帐号",
      search: { el: "input", placeholder: "请输入帐号" }
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
    { label: "名字", prop: "name", align: "center", minWidth: 100 },
    { label: "账号", prop: "email", align: "center", minWidth: 100 },
    { label: "密码", prop: "password", align: "center", minWidth: 100 },
    { label: "是否分销员", prop: "isDistributor", align: "center", minWidth: 100 },
    { label: "分销员等级", prop: "levelName", align: "center", minWidth: 100 },
    { label: "上级分销员", prop: "parentId", align: "center", minWidth: 100 },
    { label: "分账总和", prop: "totalCommission", align: "center", minWidth: 100 },
    { label: "修改时间", prop: "updatedAt", align: "center", minWidth: 100 },
    { label: "操作", prop: "operation", fixed: "right", width: 200, align: "center" }
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
