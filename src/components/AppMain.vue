<script>
import { store } from "../data/store.js";
import MovieList from "./MovieList.vue";
export default {
  name: "AppMain",
  components: {
    MovieList,
  },

  data() {
    return {
      store,
    };
  },

  created() {},
};
</script>

<template>
  <main>
    <div class="container">
      <!-- ------------------ -->
      <!-- ----- MOVIES ----- -->
      <!-- ------------------ -->
      <MovieList :movies="store.movies" />
      <!-- ------------------ -->
      <!-- ----- SERIES ----- -->
      <!-- ------------------ -->
    </div>
  </main>
</template>

<style scoped>
main {
  padding-top: 80px;
}
</style>
