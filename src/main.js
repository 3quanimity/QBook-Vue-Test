// TODO:
// Vue CRUD ✅
// Multiple Vue Components ✅
// Vuex 🔂
// Persist data to browser cache 🔂
// ts 🔂

import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store.js";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
