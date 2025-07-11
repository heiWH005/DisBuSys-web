import { App } from "vue";
import copy from "./modules/copy";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import longpress from "./modules/longpress";
import num from "./modules/num";
import selectload from "./modules/elSelectLoadMore";

const directivesList: any = {
  copy,
  debounce,
  throttle,
  longpress,
  selectload
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
