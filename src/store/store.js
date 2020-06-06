import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        title: "Finish test",
        requiredTime: 60,
        editingText: false,
        editingTime: false,
      },
      {
        id: 2,
        title: "have lunch",
        requiredTime: 15,
        editingText: false,
        editingTime: false,
      },
    ],
  },
});
