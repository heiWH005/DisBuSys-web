import { http } from "../index";

// 登录
export const loginApi = (params?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          authorization: "123123123",
          accountNo: "123123123"
        }
      });
    }, 1000);
  });
};

// 获取初始化参数
export const getInitParams = (params?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          levelList: [
            {
              levelNumber: 0,
              levelName: "string"
            }
          ]
        }
      });
    }, 1000);
  });
};

// 获取用户列表
export const getUserList = (params?: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: "string",
        data: {
          total: 100,
          pageNum: 1,
          pageSize: 10,
          dataList: [
            {
              id: 0,
              name: "string",
              email: "string",
              password: "string",
              isDistributor: 0,
              levelName: "string",
              parentId: 0,
              updatedAt: 0,
              totalCommission: 0
            }
          ]
        }
      });
    }, 1000);
  });
};

// 保存或更新用户
export const saveOrUpdateUser = (params?: any) => {
  return http.post<any>(`/dis/management/user/save-or-update`, params, {});
};

// 获取产品列表
export const getProductList = (params?: any) => {
  return http.post<any>(`/dis/management/product/list`, params, {});
};

// 保存或更新产品
export const saveOrUpdateProduct = (params?: any) => {
  return http.post<any>(`/dis/management/product/save-or-update`, params, {});
};

// 获取订单列表
export const getOrderList = (params?: any) => {
  return http.post<any>(`/dis/management/order/list`, params, {});
};

// 获取佣金账单列表
export const getCommissionLedgerList = (params?: any) => {
  return http.post<any>(`/dis/management/commission-ledger/list`, params, {});
};

// 获取提现列表
export const getWithdrawalsList = (params?: any) => {
  return http.post<any>(`/dis/management/withdrawals/list`, params, {});
};

// 提现
export const withdrawals = (params?: any) => {
  return http.post<any>(`/dis/management/withdrawals/submit`, params, {});
};
