import { defineStore } from "pinia";
import { keepAliveState } from "@/stores/interface";

// useKeepAliveStore
export const useKeepAliveStore = defineStore({
  id: "useKeepAliveStore",
  state: (): keepAliveState => ({
    keepAliveName: []
  }),
  actions: {
    // addKeepAliveName
    async addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
    },
    // removeKeepAliveName
    async removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter(item => item !== name);
    },
    // setKeepAliveName
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName;
    }
  }
});
