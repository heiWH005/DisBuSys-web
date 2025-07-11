<template>
  <el-tooltip effect="dark" :content="content" :show-after="150" placement="bottom-start">
    <template #content>
      <div class="popper-class">
        {{ content }}
      </div>
    </template>
    <div class="cell_tip">{{ content }}</div>
  </el-tooltip>
</template>
<script lang="ts" setup>
const props = defineProps({
  content: String
});
</script>
<style lang="scss" scoped>
.cell_tip {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.popper-class {
  max-width: 300px !important;
}
</style>
