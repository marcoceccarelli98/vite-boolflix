<script>
import axios from "axios";
import { store } from "./data/store.js";
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
export default {
  components: {
    AppHeader,
    AppMain,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    // ------------
    //  ASSIGNMENT
    // ------------
    getMovies(response) {
      store.movies = response.data.results;
      //console.log(store.movies);
    },
    getSeries(response) {
      store.series = response.data.results;
      //console.log(response.data.results);
    },
    getMoviesActors(response) {
      store.movies.cast = response.data.cast;
      console.log(store.movies.cast);
    },

    // --------
    //  SEARCH
    // --------
    apiSearchMovie() {
      axios
        .get(store.apiUrl + store.apiSearchMovie, {
          params: {
            api_key: store.apiKey,
            query: store.inputSearch,
          },
        })
        .then((response) => this.getMovies(response))
        .catch((error) => {
          console.log("Search Movie ERROR");
          store.apiError = error;
        });
    },

    apiSearchSeries() {
      axios
        .get(store.apiUrl + store.apiSearchSeries, {
          params: {
            api_key: store.apiKey,
            query: store.inputSearch,
          },
        })
        .then((response) => this.getSeries(response))
        .catch((error) => {
          console.log("Search Series ERROR");
          store.apiError = error;
        });
    },

    searchItems() {
      store.loading = true;
      this.apiSearchMovie();
      this.apiSearchSeries();
      // this.apiGetActors();
      store.loading = false;
    },
    // }
  },
};
</script>

<template>
  <AppHeader @search="searchItems" />
  <AppMain />
</template>

<style scoped></style>
