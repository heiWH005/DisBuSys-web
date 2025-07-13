import { Table } from "./interface";
import { reactive, computed, toRefs, ref } from "vue";
import notData from "@/assets/images/notData.png";
import { removeEmptyValues } from "@/utils/util";
import { ElMessage } from "element-plus";
/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Boolean} isPageable 是否有分页(非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法(非必传)
 * */
export const useTable = (
  api?: (params: any) => Promise<any>,
  dataCallBack?: (data: any) => any,
  paramsCallBack?: (params: any) => any,
  isPageable: boolean = true
) => {
  const state = reactive<Table.TableStateProps>({
    tableData: [],
    pageable: {
      pageNum: 1,
      pageSize: 10,
      total: 0
    },
    totalParam: {},
    searchParam: {},
    baseParam: {},
    loading: false
  });
  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize
      };
    },
    set: (newVal: any) => {
      console.log("我是分页更新之后的值", newVal);
    }
  });
  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableList = async (func?: Function) => {
    try {
      state.loading = true;
      // 先把初始化参数和分页参数放到总参数里面
      let totalParam = Object.assign({}, state.baseParam, state.searchParam, isPageable ? pageParam.value : {});
      totalParam = removeEmptyValues(totalParam);
      paramsCallBack && typeof paramsCallBack == "function" && (totalParam = paramsCallBack(totalParam));
      if (typeof func === "function") {
        totalParam = func(totalParam);
      }
      state.totalParam = totalParam;
      let res = await api({ ...totalParam });
      let { data, code, message } = res;
      if (code !== 200) {
        ElMessage.warning(message);
      }
      data.dataList = data.dataList || [];
      dataCallBack && (data = dataCallBack(data));
      state.tableData = isPageable ? data.dataList : data;
      let { pageNum, pageSize, total } = data;
      pageNum = Number(pageNum);
      pageSize = Number(pageSize);
      isPageable && updatePageable({ total: total, pageNum, pageSize });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      state.loading = false;
    }
  };
  /**
   * @description 更新分页信息
   * @param {Object} resPageable 后台返回的分页数据
   * @return void
   * */
  const updatePageable = (resPageable: Table.Pageable) => {
    Object.assign(state.pageable, resPageable);
  };

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = (func?: Function) => {
    state.pageable.pageNum = 1;

    if (typeof func === "function") {
      getTableList(func);
    } else {
      getTableList();
    }
  };
  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pageable.pageNum = 1;
    state.searchParam = {};
    getTableList();
  };
  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const handleSizeChange = (val: number) => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;
    getTableList();
  };

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const handleCurrentChange = (val: number) => {
    state.pageable.pageNum = val;
    getTableList();
  };

  /**
   * @description 渲染表格空白位
   * @return void
   * */
  const renderEmpty = () => {
    return (
      <div class="table-empty">
        <slot name="empty">
          <img src={notData} alt="notData" />
          <div>暂无数据</div>
        </slot>
      </div>
    );
  };

  const proTableRef = ref(null);
  return {
    ...toRefs(state),
    proTableRef,
    handleSizeChange,
    handleCurrentChange,
    getTableList,
    search,
    reset,
    renderEmpty,
    pageParam
  };
};
