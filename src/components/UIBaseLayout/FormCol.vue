<template>
  <el-col v-bind="props">
    <slot></slot>
  </el-col>
</template>
<script lang="ts" setup name="FormRow">
import { ColProps } from "element-plus/es/components/col/index";

interface MyProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  [key: string]: any;
}
const props = withDefaults(defineProps<MyProps>(), {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8
});
</script>
<style lang="scss" scoped></style>
