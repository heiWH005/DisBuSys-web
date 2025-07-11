<template>
  <div class="main-box">
    <div class="card filter" :style="{ width: filterWidth + 'px' }" v-if="includeTreeCard">
      <!-- 左边树 -->
      <slot name="treeCard"></slot>
    </div>
    <div class="table-box" :style="{ width: `calc(100% - ${filterWidth + 10}px)` }">
      <div class="no-card card_padding" v-if="includeSearchForm">
        <slot name="tabSelect"></slot>
        <!-- 上面搜索 -->
        <div class="pl20 pr20">
          <slot name="searchForm"></slot>
        </div>
      </div>
      <div class="card table-main">
        <div class="table-header">
          <div class="header-button-lf">
            <!-- 表格上左 -->
            <slot name="tableHeader" />
          </div>
          <div class="header-button-ri">
            <!-- 表格上右 -->
            <slot name="toolButton"></slot>
          </div>
        </div>
        <!-- 表单区域 -->
        <slot></slot>

        <!-- 分页 -->
        <slot name="pagination"> </slot>
        <!-- 弹窗类 -->
        <slot name="dialog"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
const slots = useSlots();
const includeTreeCard = ref(slots.treeCard);
const includeSearchForm = ref(slots.searchForm);
const props = defineProps({
  filterWidth: {
    type: Number,
    default: 220
  }
});
</script>
<style lang="scss" scoped>
.filter {
  box-sizing: border-box;
  width: 220px;
  height: 100%;
  padding: 18px;
  margin-right: 10px;
  flex-shrink: 0;
}

.card_padding {
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
  box-shadow: 0 0 12px rgb(0 0 0 / 5%);
  margin-bottom: 10px;
}
</style>
