// TODO:
// ✅ Vue CRUD
// ✅ Multiple Vue Components
// ✅ Vuex
// ✅ Persist data to local storage
// 🔂 ts

import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
