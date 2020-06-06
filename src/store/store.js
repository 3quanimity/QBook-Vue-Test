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

  getters: {
    remainingTime(state) {
      let totalMin = 0;
      state.todos.map((el) => (totalMin += Number(el.requiredTime)));

      let hours = Math.floor(totalMin / 60);
      let minutes = totalMin % 60;

      return hours != 0 || minutes != 0
        ? `${hours} hours and ${minutes} minutes of work remaining`
        : `No tasks left, Good Job!`;
    },
  },
});