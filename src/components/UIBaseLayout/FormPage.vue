<template>
  <div class="main-box">
    <div class="card filter" :style="{ width: filterWidth + 'px' }" v-if="includeTreeCard">
      <!-- 左边树 -->
      <slot name="treeCard"></slot>
    </div>
    <div class="table-box" :style="{ width: `calc(100% - ${filterWidth + 10}px)` }">
      <div class="card table-main">
        <!-- 表单区域 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
const slots = useSlots();
const includeTreeCard = ref(slots.treeCard);
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
</style>
