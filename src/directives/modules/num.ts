import type { Directive } from "vue";
import { ElMessage } from "element-plus";

//  v-num  只能是数字并且保留两位小数 为表单添加  name="int"  属性正整数
const num: Directive = {
  updated(el) {
    let oinput = el.children[0].lastElementChild;
    if (oinput.value) {
      oinput.value = oinput.value.replace(/[^0-9|.]|\s/g, "");
      oinput.dispatchEvent(new Event("input"));
      oinput.onblur = function () {
        let reg = /(^[1-9]+\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        if (oinput.name == "int") {
          // 正整数（不包括0）
          reg = /^[1-9]\d*$/;
        }
        if (!reg.test(oinput.value)) {
          ElMessage.warning(oinput.name == "int" ? "只能为整数并且不能为0" : "必填并且只能是数字,最多两位小数");
          oinput.value = "";
          oinput.dispatchEvent(new Event("input"));
        }
      };
    }
  }
};
export default num;
