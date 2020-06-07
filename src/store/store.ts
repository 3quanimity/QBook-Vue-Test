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
    //   {
    //     id: 1,
    //     title: "Finish test",
    //     requiredTime: 60,
    //     editingText: false,
    //     editingTime: false,
    //   },
    //   {
    //     id: 2,
    //     title: "Have lunch",
    //     requiredTime: 15,
    //     editingText: false,
    //     editingTime: false,
    //   },
    // ],
  },

  // 👋 Note to self: use when processing is local (fast)
  mutations: {
    addTodo(state, todo: ToDoModel) {
      state.todos.push(
        todo
        //   {
        //   id: todo.id,
        //   title: todo.title,
        //   requiredTime: todo.requiredTime,
        //   editingText: false,
        //   editingTime: false,
        // }
      );
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((el) => el.id == id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, todo: ToDoModel) {
      const index = state.todos.findIndex((el) => el.id == todo.id);
      state.todos.splice(
        index,
        1,
        todo
        //   {
        //   id: todo.id,
        //   title: todo.title,
        //   requiredTime: todo.requiredTime,
        //   editingText: todo.editingText,
        //   editingTime: todo.editingTime,
        // }
      );
    },
  },

  // 👋 Note to self: use when processing would take time aka communicate with a DB (asynchronus)
  actions: {
    addTodo(context, todo: ToDoModel) {
      // simulating a req for async code
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

      return hours != 0 || minutes != 0
        ? `${hours} hours and ${minutes} minutes of work remaining`
        : `No tasks left, Good Job!`;
    },
  },

  plugins: [vuexPersist.plugin],
});
