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
    <div class="remove-item" @click="removeTodo">&times;</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TodoItem" as string,
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
      id: this.todo.id as string,
      title: this.todo.title as string,
      editingText: this.todo.editingText as boolean,
      editingTime: this.todo.editingTime as boolean,
      requiredTime: this.todo.requiredTime as number,
      beforeEditCache: "" as string,
      beforeEditTimeCache: 0 as number
    };
  },

  directives: {
    // Custom directive from Vue documentation to fix focus/blur issue when editing
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },

  methods: {
    removeTodo(): void {
      this.$store.dispatch("deleteTodo", this.id);
    },
    editText(): void {
      this.beforeEditCache = this.title;
      this.editingText = true;
    },
    editTime(): void {
      this.beforeEditTimeCache = this.requiredTime;
      this.editingTime = true;
    },
    doneEdit(): void {
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
        id: this.id as string,
        title: this.title as string,
        requiredTime: this.requiredTime as number,
        editingText: this.editingText as boolean,
        editingTime: this.editingTime as boolean
      });
    }
  }
});
</script>

<style></style>
