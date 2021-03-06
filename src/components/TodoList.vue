<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="Enter a task to track"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />

    <div class="total-time-container">
      <div>{{ remainingTime }}</div>
    </div>

    <transition-group
      name="fade"
      enter-active-class="animate__animated animate__bounceInLeft"
      leave-active-class="animate__animated animate__bounceOutRight"
    >
      <TodoItem
        v-for="(todo, index) in $store.state.todos"
        :key="todo.id"
        :todo="todo"
        :index="index"
        @removedTodo="removeTodo"
        @finishedEdit="finishedEdit"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { uuid } from "vue-uuid";
import TodoItem from "./TodoItem.vue";
import Vue from "vue";

export default Vue.extend({
  name: "TodoList" as string,
  components: {
    TodoItem
  },

  data() {
    return {
      newTodo: "" as string,
      newRequiredTime: 0 as number
    };
  },

  computed: {
    remainingTime(): string {
      return this.$store.getters.remainingTime;
    }
  },

  methods: {
    addTodo(): void {
      // prevent addition on empty input
      if (this.newTodo.trim().length === 0) {
        return;
      }

      // commiting a mutation to the store
      this.$store.dispatch("addTodo", {
        id: uuid.v4(),
        title: this.newTodo,
        requiredTime: this.newRequiredTime
      });

      this.newTodo = "";
      this.newRequiredTime = 0;
    }
  }
});
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: red;
  }
}

.todo-item-text {
  display: flex;
  align-items: center;
}

.todo-item-display {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }
}

.edit-number {
  max-width: 90px;
}

.minutes-container {
  display: flex;
  align-items: center;
}

.total-time-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-bottom: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
</style>
