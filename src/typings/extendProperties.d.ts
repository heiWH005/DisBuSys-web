import { ComponentCustomProperties } from "@vue/runtime-core";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dayjs: proxy;
  }
}

export default ComponentCustomProperties;
