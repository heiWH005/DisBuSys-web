<template>
  <el-row v-bind="props">
    <slot></slot>
  </el-row>
</template>
<script lang="ts" setup name="FormRow">
import { RowProps } from "element-plus/es/components/row/src/row";
const props = withDefaults(defineProps<RowProps>(), {
  gutter: 20
});
</script>
<style lang="scss" scoped></style>
