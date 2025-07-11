<template>
  <div class="main-box">
    <div class="table-box">
      <div class="card table-main">
        <div class="table-header">
          <div class="header-button-lf">
            <!-- 表格上左 -->
            <slot name="filter"></slot>
          </div>
          <div class="header-button-ri">
            <!-- 表格上右 -->
            <slot name="toolButton"></slot>
          </div>
        </div>
        <!-- 表单区域 -->
        <slot name="table"></slot>
        <!-- 分页 -->
        <slot name="pagination"> </slot>
        <!-- 弹窗类 -->
        <slot name="dialog"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSlots, ref } from "vue";
const slots = useSlots();
const includeFilter = ref(slots.filter);
</script>
<style lang="scss" scoped>
:deep(.el-button) {
  margin-bottom: 0 !important;
}
</style>
