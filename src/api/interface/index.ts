// * 请求响应参数(不包含data)
export interface Result {
  code: any;
  msg?: string;
  message?: string;
  flag?: any;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T;
}

// * 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// * 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// * 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
    imgUrl: string;
  }
}

// * 登录模块

export namespace Login {
  export interface ReqLoginForm {
    accountNo: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }

  export interface Code {
    images: string;
    key: string;
  }

  export interface Key {
    key: string;
  }

  export interface Status {
    status: number;
    token: string;
  }

  export interface LoginCfg {
    [key: string]: any;
  }
}

// * 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    account: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
}
