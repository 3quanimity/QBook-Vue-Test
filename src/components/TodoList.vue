<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div v-for="todo in todos" :key="todo.id" class="todo-item">
      {{ todo.title }}
    </div>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";

export default {
  name: "TodoList",
  data() {
    return {
      newTodo: "",
      newRequiredTime: 0,
      todos: [
        {
          id: 1,
          title: "Finish test",
          isComplete: false,
          requiredTime: 60,
        },
        {
          id: 2,
          title: "have lunch",
          isComplete: false,
          requiredTime: 15,
        },
      ],
    };
  },

  methods: {
    addTodo() {
      this.todos.push({
        id: uuid.v4(),
        title: this.newTodo,
        requiredTime: this.newRequiredTime,
        isComplete: false,
      });
      this.newTodo = "";
      this.newRequiredTime = 0;
    },
  },
};
</script>

<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}
</style>
