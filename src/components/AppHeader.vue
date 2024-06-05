<script>
import { store } from "../data/store.js";
export default {
  name: "AppHeader",
  emits: ["search"],
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <header>
    <div class="container flex j-between">
      <div class="logo">
        <span>BOOLFLIX</span>
      </div>
      <div class="research">
        <input
          @keyup.enter="$emit('search')"
          type="text"
          v-model="store.inputSearch"
        />
        <button @click="$emit('search')">Search</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  height: 80px;
}

.logo {
  font-family: Arial, Helvetica, sans-serif;
  color: red;
  font-size: 40px;
}

.research {
  display: flex;
  align-items: center;
}

input {
  margin-right: 10px;
  height: 30px;
  font-size: 15px;
}

button {
  /* height: 25px; */
  padding: 5px 5px;
}
</style>
