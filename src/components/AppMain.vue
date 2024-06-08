<script>
import { store } from "../data/store.js";
import MovieList from "./MovieList.vue";
import SeriesList from "./SeriesList.vue";
export default {
  name: "AppMain",
  components: {
    MovieList,
    SeriesList,
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
      <div class="items-list" v-show="store.menu[0].isActive">
        <h2>MOVIES</h2>
        <MovieList :movies="store.movies" />
      </div>
      <!-- ------------------ -->
      <!-- ----- SERIES ----- -->
      <!-- ------------------ -->
      <div class="items-list" v-show="store.menu[1].isActive">
        <h2>SERIES</h2>
        <SeriesList :series="store.series" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding-top: 80px;
}
</style>
