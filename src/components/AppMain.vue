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
  methods: {},
  computed: {},

  created() {},
};
</script>

<template>
  <main>
    <div v-if="!store.loading" class="container">
      <!-- ------------------ -->
      <!-- ----- MOVIES ----- -->
      <!-- ------------------ -->

      <div class="items-list" v-show="store.menu[0].isActive">
        <MovieList :movies="store.filtMovies" />
      </div>
      <!-- ------------------ -->
      <!-- ----- SERIES ----- -->
      <!-- ------------------ -->
      <div class="items-list" v-show="store.menu[1].isActive">
        <SeriesList :series="store.filtSeries" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding-top: 10px;
}
</style>
