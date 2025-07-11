import { isArray } from "@/utils/is";

//1.功能：将浮点数四舍五入，取小数点后2位
export function toDecimal(x: any): number {
  let f = parseFloat(x);
  if (isNaN(f)) {
    return 0;
  }
  f = Math.round(x * 100) / 100;
  return f;
}

/**
 * 把base64转化为blob对象，便于使用fromdata上传图片
 */
export function dataURItoBlob(dataURI: string, image_fmt = "png") {
  const byteString = window.atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {
    type: "image/" + image_fmt
  });
}

/**
 * @description 转换文件成base64数据
 * @param {Object} file - 文件对象
 */
export function changeFileIntoBase64(file: any) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (result: any) => {
      const base64Str = result.currentTarget.result;
      resolve(base64Str);
    };
  });
}

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export function localGet(key: string) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export function localRemove(key: string) {
  window.localStorage.removeItem(key);
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
  window.localStorage.clear();
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
  if (val === null) return "null";
  if (typeof val !== "object") return typeof val;
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 生成唯一 uuid
 * @return string
 */
export function generateUUID() {
  if (typeof crypto === "object") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === "function" && typeof Uint8Array === "function") {
      const callback = (c: any) => {
        const num = Number(c);
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
      };
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let performanceNow = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (performanceNow + random) % 16 | 0;
      performanceNow = Math.floor(performanceNow / 16);
    }
    return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
  if (!a || !b) return false;
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) return false;
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    let propA = a[propName];
    let propB = b[propName];
    if (!b.hasOwnProperty(propName)) return false;
    if (propA instanceof Object) {
      if (!isObjectValueEqual(propA, propB)) return false;
    } else if (propA !== propB) {
      return false;
    }
  }
  return true;
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}

/**
 * @description 获取当前时间对应的提示语
 * @return string
 */
export function getTimeState() {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();
  // 判断当前时间段
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}

/**
 * @description 递归查询当前路由所对应的路由
 * @param {Array} menuList 所有菜单列表
 * @param {String} path 当前访问地址
 * @return array
 */
export function filterCurrentRoute(menuList: Menu.MenuOptions[], path: string) {
  let result = {};
  for (let item of menuList) {
    if (item.path === path) return item;
    if (item.children) {
      const res = filterCurrentRoute(item.children, path);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
}

/**
 * @description 根据接口菜单  处理成现在项目的菜单格式(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getBaseMenuArr(menuList) {
  return menuList.map(item => {
    if (item.menuType == "func") {
      return;
    }
    const newItem: any = {
      path: item.frontRout,
      component: item.component,
      name: item.routName,
      meta: {
        title: item.name,
        isHide: item.status == 1 ? true : false,
        icon: item.icon
      }
    };
    if (item.children && item.children.length) {
      newItem.redirect = item.children.find(e => e.status == "0")?.frontRout;
      newItem.children = getBaseMenuArr(item.children).map(child => ({
        ...child
      }));
    }
    return newItem;
  });
}

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
    let flatArr = [...pre, current];
    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
    return flatArr;
  }, []);
}

/**
 * @description 使用递归，过滤需要缓存的路由（暂时没有使用）
 * @param {Array} menuList 所有菜单列表
 * @param {Array} cacheArr 缓存的路由菜单 name ['**','**']
 * @return array
 * */
export function getKeepAliveRouterName(menuList: Menu.MenuOptions[], keepAliveArr: string[] = []) {
  menuList.forEach(item => {
    item.meta.isKeepAlive && item.name && keepAliveArr.push(item.name);
    item.children?.length && getKeepAliveRouterName(item.children, keepAliveArr);
  });
  return keepAliveArr;
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param {Array} menuList 所有菜单列表
 * @return array
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

export function handleShowMenuList(list) {
  list.map(e => {
    let no_hidden = 0;
    e.children &&
      e.children.map(c => {
        c.meta.isHide == false && no_hidden++;
      });
    if (no_hidden <= 1) {
      delete e.children;
      e.path = e.redirect;
    }
  });
  return list;
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组(第一版本地路由鉴权会用到)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @return array
 */
export function getMenuListPath(menuList: Menu.MenuOptions[], menuPathArr: string[] = []) {
  menuList.forEach((item: Menu.MenuOptions) => {
    typeof item === "object" && item.path && menuPathArr.push(item.path);
    item.children?.length && getMenuListPath(item.children, menuPathArr);
  });
  return menuPathArr;
}

/**
 * @description 递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {Array} parent 父级菜单
 * @returns object
 */
export const getAllBreadcrumbList = (menuList: Menu.MenuOptions[], result: { [key: string]: any } = {}, parent = []) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
  }
  return result;
};

/**
 * @description 格式化表格单元格默认值(el-table-column)
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} callValue 当前单元格值
 * @return string
 * */
export function defaultFormat(row: number, col: number, callValue: any) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
  return callValue ?? "--";
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
  return callValue ?? "--";
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
  if (!prop.includes(".")) return row[prop] ?? "--";
  prop.split(".").forEach(item => (row = row[item] ?? "--"));
  return row;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
  const propArr = prop.split(".");
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames 指定 label && value 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(
  callValue: any,
  enumData: any[] | undefined,
  fieldNames?: { label: string; value: string },
  type?: string
): string {
  const value = fieldNames?.value ?? "value";
  const label = fieldNames?.label ?? "label";
  let filterData: { [key: string]: any } = {};
  if (Array.isArray(enumData)) filterData = enumData.find((item: any) => item[value] === callValue);
  if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
  return filterData ? filterData[label] : "--";
}

export function deepCopy(object: any) {
  let result: any;
  if (Object.prototype.toString.call(object) == "[object Object]") {
    result = {};
  } else if (Object.prototype.toString.call(object) == "[object Array]") {
    result = [];
  } else {
    return "不符合深拷贝的数据类型";
  }
  // 遍历空对象或者是空数组  也就是要拷贝的对象
  for (let key in object) {
    if (typeof object[key] == "object") {
      result[key] = deepCopy(object[key]);
    } else {
      result[key] = object[key];
    }
  }
  return result;
}

//将时间戳转换成日期格式
export function timestampToTime(timestamp: any) {
  const date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + "-";
  const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  const D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  const h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  const m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
  const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

export function parseTime(time: Date | number, cFormat: string = "{y}-{M}-{d} {h}:{m}:{s}") {
  const format = cFormat || "{y}-{M}-{d} {h}:{m}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = time * 1000;
    date = new Date(time);
  }
  const formatObj: any = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    w: date.getDay()
  };
  const time_str = format.replace(/{(y|M|d|h|m|s|w)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "w") return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

//将时间戳转换成日期格式
export function timestampWeek(timestamp: any) {
  const arr = ["日", "一", "二", "三", "四", "五", "六"];
  const date = new Date(timestamp);
  const week = date.getDay();
  return `星期${arr[week]}`;
}

// 根据城市id切割成数组
//
export function getCityIdList(ids: string, currentId?: number) {
  if (ids.endsWith("0000")) {
    return [ids].map(Number);
  } else if (ids.endsWith("00")) {
    return [ids.slice(0, 2) + "0000", ids].map(Number);
  } else {
    return [ids.slice(0, 2) + "0000", ids.slice(0, 4) + "00", ids].map(Number);
  }

  let areaIdList: any = [];
  if (ids.length === 2) {
    areaIdList.push([ids]);
  }
  let whiteList = ["1101", "1201", "3101", "5001"];
  if (ids.length === 4) {
    if (whiteList.indexOf(ids) != -1) {
      areaIdList.push(ids);
    } else {
      areaIdList.push(...[ids.slice(0, 2), ids]);
    }
  }
  if (ids.length === 6) {
    if (whiteList.indexOf(ids.slice(0, 4)) != -1) {
      areaIdList.push(...[ids.slice(0, 4) + "00", ids]);
    } else {
      areaIdList.push(...[ids.slice(0, 2) + "0000", ids.slice(0, 4) + "00", ids]);
    }
  }
  if (ids.length >= 8) {
    areaIdList.push(...[ids.slice(0, 2), ids.slice(0, 4), ids.slice(0, 6), ids]);
  }
  if (currentId) {
    let _len = String(currentId).length;
    let index = areaIdList.findIndex(item => item.length === _len);
    areaIdList = areaIdList.slice(index);
  }

  return areaIdList.map(Number);
}
export function removeEmptyValues(obj: object) {
  return Object.keys(obj).reduce((acc, key) => {
    if (
      obj[key] !== "" &&
      obj[key] !== null &&
      obj[key] !== undefined &&
      !(typeof obj[key] === "object" && Object.keys(obj[key]).length === 0)
    ) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

export const EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget|Element|Document} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent("on" + eventType, callback);
      return {
        remove() {
          target.detachEvent("on" + eventType, callback);
        }
      };
    }
  }
};
export function removeCodeParam(url) {
  const urlObj = new URL(url);
  // 获取 URL 的哈希部分（#后面的部分）
  const hash = urlObj.hash;
  if (!hash) {
    // 如果没有哈希部分，处理查询参数
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("code"); // 删除 'code' 参数
    urlObj.search = searchParams.toString(); // 更新查询参数
  } else {
    const [path, queryString] = hash.slice(1).split("?"); // 去掉 # 并分离路径和查询参数
    const searchParams = new URLSearchParams(queryString || ""); // 处理可能为空的查询字符串
    searchParams.delete("code"); // 删除 'code' 参数
    // 只在有查询参数时添加问号
    const newQueryString = searchParams.toString();
    urlObj.hash = `#${path}${newQueryString ? "?" + newQueryString : ""}`;
  }
  return urlObj.toString();
}
