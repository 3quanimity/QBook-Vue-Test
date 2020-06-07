<template>
  <div class="todo-item">
    <div class="todo-item-text">
      <div v-if="!editingText" @click="editText" class="todo-item-display">
        {{ title }}
      </div>
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
      <div v-if="!editingTime" @click="editTime" class="todo-item-display">
        {{ requiredTime }}
      </div>
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
    <div class="remove-item" @click="removeTodo">&times;</div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      editingText: this.todo.editingText,
      editingTime: this.todo.editingTime,
      requiredTime: this.todo.requiredTime,
      beforeEditCache: "",
      beforeEditTimeCache: 0,
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
    removeTodo() {
      this.$store.dispatch("deleteTodo", this.id);
    },
    editText() {
      this.beforeEditCache = this.title;
      this.editingText = true;
    },
    editTime() {
      this.beforeEditTimeCache = this.requiredTime;
      this.editingTime = true;
    },
    doneEdit() {
      // prevent empty title when editing
      if (this.title.trim().length === 0) {
        alert("Click the X on the right if you want to delete the item");
        this.title = this.beforeEditCache;
      }

      // prevent input of negative numbers or empty input when editing
      if (
        this.requiredTime < 0 ||
        String(this.requiredTime).trim().length === 0
      ) {
        alert("Negative time or Empty input aren't allowed");
        this.requiredTime = this.beforeEditTimeCache;
      }

      this.requiredTime = Number(this.requiredTime);
      this.editingText = false;
      this.editingTime = false;

      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        requiredTime: this.requiredTime,
        editingText: this.editingText,
        editingTime: this.editingTime,
      });
    },
  },
};
</script>

<style></style>
