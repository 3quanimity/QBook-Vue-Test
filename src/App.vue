<template>
  <div id="app" class="container">
    <img class="logo" alt="Vue logo" src="./assets/logo.png" />
    <TodoList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoList from "./components/TodoList.vue";

export default Vue.extend({
  name: "App",
  components: {
    TodoList
  }
});
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
