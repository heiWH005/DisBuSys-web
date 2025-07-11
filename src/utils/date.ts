import dayjs from "dayjs";
// 获取本周
export const getNowWeek = () => {
  let startTime, endTime;
  let now = new Date();
  let nowDayOfWeek = now.getDay();
  let nowDay = now.getDate();
  let nowMonth = now.getMonth();
  let nowYear = now.getFullYear();
  startTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  endTime = new Date(nowYear, nowMonth, nowDay + 6 - nowDayOfWeek);
  return [startTime, endTime];
};

// 获取本月
export const getNowMonth = () => {
  let startTime, endTime;
  let now = new Date();
  let nowMonth = now.getMonth();
  let nowYear = now.getFullYear();
  startTime = new Date(nowYear, nowMonth, 1);
  endTime = new Date(nowYear, nowMonth + 1, 0);
  return [startTime, endTime];
};

// 获取近几天
export const getRecentlyDay = (num: number) => {
  let now = new Date();
  let params = new Date(now.getTime() - 24 * 60 * 60 * 1000 * num);
  return [params, now];
};

export function parseTime(time: Date | number, cFormat?: string) {
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
