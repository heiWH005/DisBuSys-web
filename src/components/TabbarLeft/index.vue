<template>
  <div class="tabbar_left_container">
    <slot :active="valueHtml"></slot>
  </div>
</template>
<script lang="ts" setup name="TabbarLeft">
let props = defineProps({
  value: String
});
type EmitProps = {
  (e: "update:value", val: string): any;
  (e: "tab-click", val: string): any;
};
const emit = defineEmits<EmitProps>();
const valueHtml = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    emit("tab-click", val);
    emit("update:value", val);
  }
});
provide("active", valueHtml);
</script>

<style lang="scss" scoped>
.tabbar_left_container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
