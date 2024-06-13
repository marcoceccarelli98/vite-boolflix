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
      filteredMovies: [],
    };
  },
  methods: {
    // checkFilter(item) {
    //   // GENRE
    //   if (item.genres.includes(store.filters.genre.filterId)) {
    //     console.log("item : " + item.title);
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    // filtMovies() {
    //   if (store.filters.genre.filterId !== 0 && store.menu[0].isActive) {
    //     return store.movies.filter((movie) => this.checkFilter(movie));
    //   }
    //   return store.movies;
    // },
  },

  computed: {
    filtMovies() {
      if (store.filters.filterOn) {
        return store.movies.filter(
          (movie) =>
            Array.isArray(movie.genres) &&
            movie.genres.includes(store.filters.genre.filterId)
        );
      } else {
        return store.movies;
      }
    },
  },

  mounted() {},

  created() {},
};
</script>

<template>
  <main>
    <div v-if="!store.loading" class="container">
      <!-- ------------------ -->
      <!-- ----- MOVIES ----- -->
      <!-- ------------------ -->
      <!-- {{ this.filtMovies }} -->
      <div class="items-list" v-show="store.menu[0].isActive">
        <MovieList :movies="store.movies" />
      </div>

      <!-- ------------------ -->
      <!-- ----- SERIES ----- -->
      <!-- ------------------ -->
      <div class="items-list" v-show="store.menu[1].isActive">
        <SeriesList :series="store.series" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding-top: 10px;
}
</style>
