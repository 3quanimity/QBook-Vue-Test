import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import ToDoModel from "../models/TodoModel";

Vue.use(Vuex);

// 💾 vuex-persist automatically saves any Vuex store changes to localStorage
const vuexPersist = new VuexPersist({
  key: "qbook-test",
  storage: window.localStorage,
});

// 📚 Vuex Store
export const store = new Vuex.Store({
  state: {
    todos: Array<ToDoModel>(),
    // [
    // {
    //   id: 1,
    //   title: "Finish test",
    //   requiredTime: 60,
    //   editingText: false,
    //   editingTime: false,
    // },
    // {
    //   id: 2,
    //   title: "Have lunch",
    //   requiredTime: 15,
    //   editingText: false,
    //   editingTime: false,
    // },
    // ],
  },

  // 👋 Note to self: use only mutations when processing is local (fast)
  mutations: {
    addTodo(state, todo: ToDoModel) {
      state.todos.unshift(todo);
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((el) => el.id == id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, todo: ToDoModel) {
      const index = state.todos.findIndex((el) => el.id == todo.id);
      state.todos.splice(index, 1, todo);
    },
  },

  // 👋 Note to self: use actions with mutations when processing would take time aka communicate with a DB (asynchronus)
  actions: {
    addTodo(context, todo: ToDoModel) {
      // 👋 Note to self: simulating a req for async code, use promise in real senario
      //   setTimeout(() => {
      context.commit("addTodo", todo);
      //   }, 1000);
    },
    deleteTodo(context, id) {
      context.commit("deleteTodo", id);
    },
    updateTodo(context, todo: ToDoModel) {
      context.commit("updateTodo", todo);
    },
  },

  getters: {
    remainingTime(state) {
      let totalMin = 0;
      state.todos.map((el) => (totalMin += Number(el.requiredTime)));

      const hours = Math.floor(totalMin / 60);
      const minutes = totalMin % 60;

      // Displays a different message depending on task list content
      if (state.todos.find((el) => el.requiredTime == 0)) {
        return `Specify a duration for your tasks`;
      } else if (!state.todos[0]) {
        return `No tasks left, Good Job!`;
      } else {
        return `${hours} hours and ${minutes} minutes of work remaining`;
      }
    },
  },

  plugins: [vuexPersist.plugin],
});
