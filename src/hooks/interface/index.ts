export namespace Table {
  export interface Pageable {
    pageNum?: number;
    pageSize?: number;
    total: number;
  }
  export interface TableStateProps {
    tableData: any[];
    pageable: Pageable;
    searchParam: {
      [key: string]: any;
    };
    totalParam?: {
      [key: string]: any;
    };
    baseParam?: {
      [key: string]: any;
    };
    icon?: {
      [key: string]: any;
    };
    loading: boolean;
  }
}

export namespace HandleData {
  export type MessageType = "" | "success" | "warning" | "info" | "error";
}

// * 请求响应参数(不包含data)
export interface Result {
  code: any;
  msg: string;
  flag?: any;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T;
}
