<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
      <div class="todo-item-text">
        <div
          v-if="!todo.editingText"
          @dblclick="editText(todo)"
          class="todo-item-display"
        >
          {{ todo.title }}
        </div>
        <input
          v-else
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          class="todo-item-edit"
          type="text"
          v-model="todo.title"
          v-focus
        />
      </div>

      <div class="todo-item-text">
        <div
          v-if="!todo.editingTime"
          @dblclick="editTime(todo)"
          class="todo-item-display"
        >
          {{ todo.requiredTime }}
        </div>
        <input
          v-else
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          class="todo-item-edit"
          type="number"
          v-model="todo.requiredTime"
          v-focus
        />
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
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
      beforeEditCache: "",
      todos: [
        {
          id: 1,
          title: "Finish test",
          isComplete: false,
          requiredTime: 60,
          editingText: false,
          editingTime: false,
        },
        {
          id: 2,
          title: "have lunch",
          isComplete: false,
          requiredTime: 15,
          editingText: false,
          editingTime: false,
        },
      ],
    };
  },

  directives: {
    // Custom directive from Vue documentation to fix focus/blur issue when editing
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
  },

  methods: {
    addTodo() {
      // prevent addition on empty input
      if (this.newTodo.trim().length === 0) {
        return;
      }

      this.todos.push({
        id: uuid.v4(),
        title: this.newTodo,
        requiredTime: this.newRequiredTime,
        isComplete: false,
        editingText: false,
        editingTime: false,
      });
      this.newTodo = "";
      this.newRequiredTime = 0;
    },

    editText(todo) {
      this.beforeEditCache = todo.title;
      todo.editingText = true;
    },
    editTime(todo) {
      todo.editingTime = true;
    },

    doneEdit(todo) {
      if (todo.title.trim().length === 0) {
        todo.title = this.beforeEditCache;
      }
      todo.editingText = false;
      todo.editingTime = false;
    },

    removeTodo(index) {
      this.todos.splice(index, 1);
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

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
</style>
