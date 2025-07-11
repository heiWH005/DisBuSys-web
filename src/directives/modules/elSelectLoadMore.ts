/**
 * v-longpress
 * 长按指令，长按时触发事件
 */
import type { Directive, DirectiveBinding } from "vue";

const directive: Directive = {
  beforeMount(el: any, binding: DirectiveBinding) {
    const selectDom = document.querySelector(".single-select-loadmore .el-select-dropdown__wrap");
    function loadMores() {
      // 判断是否到底
      const isBase = this.scrollHeight - this.scrollTop <= this.clientHeight;
      if (isBase) {
        // 可以增加防抖，用户体验会更好，视情况而定
        binding.value && binding.value();
      }
    }
    // 将获取到的dom和函数挂载到el-select上，实例销毁时好处理
    el.selectDomInfo = selectDom;
    el.selectLoadMore = loadMores;
    // 监听滚动事件
    selectDom?.addEventListener("scroll", loadMores.bind(selectDom));
  },
  // 实例销毁
  beforeUnmount(el: any) {
    if (el.selectLoadMore) {
      el.selectDomInfo.removeEventListener("scroll", el.selectLoadMore);
      delete el.selectDomInfo;
      delete el.selectLoadMore;
    }
  }
};

export default directive;
