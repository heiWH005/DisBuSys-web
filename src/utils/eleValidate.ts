// * Element 常用表单校验规则

/**
 *  @rule 手机号
 */
export function checkPhoneNumber(rule: any, value: any, callback: any) {
  const regexp = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
  if (value === "") callback("请输入手机号码");
  if (!regexp.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    return callback();
  }
}

// 手机号或座机号
export const reg_tel_phone = /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/;

// Email
export const reg_email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

//微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
export const reg_wx = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;

//用户名正则，4到16位（字母，数字，下划线，减号）
export const reg_user_name = /^[a-zA-Z0-9_-]{4,16}$/;

//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
export const reg_password = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

//正数正则
export const reg_pos = /^\d*\.?\d+$/;

//负数正则
export const reg_neg = /^-\d*\.?\d+$/;

//数字正则
export const reg_num = /^-?\d*\.?\d+$/;

//正数的正则表达式(不包括0，小数保留两位)：
export const reg_num_int = /^[1-9]\d*(\.\d{1,2})?$/;

export const reg_num_int_f = /^[1-9]\d*$/;

//身份证号（18位）正则
export const reg_cp = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

//URL正则
export const reg_url = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

//中国统一社会信誉哦那个代码
export const reg_social_code = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
