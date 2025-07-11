<template>
  <div class="container">
    <span v-for="(key, index) in Object.keys(props.options)" :key="index" :class="options[key].type">
      {{ options[key].label }} ({{ options[key].value }})</span
    >
  </div>
</template>

<script lang="ts" setup>
type Props = {
  options: { [key: string]: any };
};
const props = withDefaults(defineProps<Props>(), {
  options: () => ({})
});
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  font-size: 14px;
}
span {
  margin-right: 8px;
  color: var(--el-text-color-primary);
}
.primary {
  color: var(--el-color-primary);
}
.success {
  color: var(--el-color-success);
}
.info {
  color: var(--el-color-info);
}
.danger {
  color: var(--el-color-danger);
}
.warning {
  color: var(--el-color-warning);
}
</style>
