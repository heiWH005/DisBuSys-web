import { http } from "../index";

// 登录
export const loginApi = (params?: any) => {
  return http.post<any>(`/dis/login`, params, { headers: { noLoading: true } });
};

// 获取初始化参数
export const getInitParams = (params?: any) => {
  return http.post<any>(`/dis/management/init/params`, params, { headers: { noLoading: true } });
};

// 获取用户列表
export const getUserList = (params?: any) => {
  return http.post<any>(`/dis/management/user/list`, params, { headers: { noLoading: true } });
};

// 保存或更新用户
export const saveOrUpdateUser = (params?: any) => {
  return http.post<any>(`/dis/management/user/save-or-update`, params, { headers: { noLoading: true } });
};

// 获取产品列表
export const getProductList = (params?: any) => {
  return http.post<any>(`/dis/management/product/list`, params, { headers: { noLoading: true } });
};

// 保存或更新产品
export const saveOrUpdateProduct = (params?: any) => {
  return http.post<any>(`/dis/management/product/save-or-update`, params, { headers: { noLoading: true } });
};

// 获取产品规则列表
export const getProductRuleList = (params?: any) => {
  return http.post<any>(`/dis/management/commission-rules/list`, params, { headers: { noLoading: true } });
};

// 保存或更新产品规则
export const saveOrUpdateProductRule = (params?: any) => {
  return http.post<any>(`/dis/management/commission-rules/save`, params, { headers: { noLoading: true } });
};

// 获取订单列表
export const getOrderList = (params?: any) => {
  return http.post<any>(`/dis/management/order/list`, params, { headers: { noLoading: true } });
};

// 获取佣金账单列表
export const getCommissionLedgerList = (params?: any) => {
  return http.post<any>(`/dis/management/commission-ledger/list`, params, { headers: { noLoading: true } });
};

// 获取提现列表
export const getWithdrawalsList = (params?: any) => {
  return http.post<any>(`/dis/management/withdrawals/list`, params, { headers: { noLoading: true } });
};

// 提现
export const withdrawals = (params?: any) => {
  return http.post<any>(`/dis/management/withdrawals/submit`, params, { headers: { noLoading: true } });
};
