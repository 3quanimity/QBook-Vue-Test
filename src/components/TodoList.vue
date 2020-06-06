<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
    />
    <div v-for="todo in todos" :key="todo.id" class="todo-item">
      {{ todo.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      newTodo: "",
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
