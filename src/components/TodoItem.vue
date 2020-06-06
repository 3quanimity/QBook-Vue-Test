<template>
  <div class="todo-item">
    <div class="todo-item-text">
      <div v-if="!editingText" @click="editText" class="todo-item-display">{{ title }}</div>
      <input
        v-else
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        class="todo-item-edit"
        type="text"
        v-model="title"
        v-focus
      />
    </div>

    <div class="todo-item-text">
      <div v-if="!editingTime" @click="editTime" class="todo-item-display">{{ requiredTime }}</div>
      <input
        v-else
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        class="todo-item-edit"
        type="number"
        min="0"
        v-model="requiredTime"
        v-focus
      />
    </div>
    <div class="remove-item" @click="removeTodo(index)">&times;</div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      editingText: this.todo.editingText,
      editingTime: this.todo.editingTime,
      requiredTime: this.todo.requiredTime,
      beforeEditCache: "",
      beforeEditTimeCache: 0
    };
  },
  methods: {
    removeTodo(index) {
      // emitting an event to remove todo object from the todoList (parent component)
      this.$emit("removedTodo", index);
    }
  }
};
</script>

<style>
</style>