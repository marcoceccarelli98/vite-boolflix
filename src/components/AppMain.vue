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
        const filtArray = store.movies.filter(
          (movie) =>
            Array.isArray(movie.genre_ids) &&
            movie.genre_ids.includes(store.filters.genre.filterId)
        );
        return filtArray;
      } else {
        return store.movies;
      }
    },

    filtSeries() {
      if (store.filters.filterOn) {
        const filtArray = store.series.filter(
          (serie) =>
            Array.isArray(serie.genre_ids) &&
            serie.genre_ids.includes(store.filters.genre.filterId)
        );
        return filtArray;
      } else {
        return store.series;
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
        <MovieList :movies="filtMovies" />
      </div>

      <!-- ------------------ -->
      <!-- ----- SERIES ----- -->
      <!-- ------------------ -->
      <div class="items-list" v-show="store.menu[1].isActive">
        <SeriesList :series="filtSeries" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding-top: 10px;
}
</style>
