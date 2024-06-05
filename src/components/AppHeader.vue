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
    <input type="text" v-model="store.inputSearch" />
    <button @click="$emit('search')">Search</button>
  </header>
</template>

<style scoped></style>
