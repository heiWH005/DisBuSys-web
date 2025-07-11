<template>
  <div
    class="tabbar-item"
    :class="[active == name ? 'tabbar-active' : '', disabled ? 'forbidden-pointer' : '']"
    @click="tabSwitch"
  >
    <el-icon v-if="elementIcon">
      <component :is="elementIcon"></component>
    </el-icon>
    <SvgIcon v-else :name="iconName" class="tabbar-icon" />
    <span class="tabbar-text font-606">{{ label }}</span>
  </div>
</template>
<script lang="ts" setup name="TabbarLeftItem">
import SvgIcon from "@/components/SvgIcon/index.vue";
const props = defineProps({
  label: {
    type: String,
    default: "基本信息"
  },
  name: String,
  iconName: {
    type: String,
    default: "xianxingzijiayou"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  active: {
    type: String
  },
  elementIcon: {
    type: String,
    default: ""
  }
});
const active: any = inject("active");

const tabSwitch = () => {
  if (!props.disabled) {
    active.value = props.name;
  }
};
</script>
<style lang="scss" scoped>
$grey: #cccccc;
.tabbar-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding-left: 20px;
  cursor: pointer;
  border-left: 4px solid var(--el-bg-color);
  .tabbar-icon {
    width: 20px !important;
    height: 22px !important;
    color: $grey;
  }
  .tabbar-text {
    margin-left: 13px;
  }
}
.tabbar-active {
  border-radius: 2px;
  animation: change 1s;
  animation-fill-mode: forwards;
  .tabbar-icon {
    color: var(--el-color-primary);
  }
  span {
    color: var(--el-color-primary);
  }
}
.tabbar-item:hover {
  .tabbar-icon {
    color: var(--el-color-primary);
  }
  span {
    color: var(--el-color-primary);
  }
}
.forbidden-pointer {
  cursor: no-drop;
  .tabbar-icon {
    color: $grey;
  }
  span {
    color: $grey;
  }
}
.forbidden-pointer:hover {
  .tabbar-icon {
    color: $grey;
  }
  span {
    color: $grey;
  }
}
@keyframes change {
  from {
    border-left: 4px solid #ffffff;
  }
  to {
    border-left: 4px solid var(--el-color-primary);
  }
}
</style>
