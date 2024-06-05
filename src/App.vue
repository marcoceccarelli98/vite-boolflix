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
    getMovies(response) {
      store.movies = response.data.results;
      console.log(response.data.results);
    },
    getSeries(response) {
      store.series = response.data.results;
      console.log(response.data.results);
    },

    apiSearchMovie() {
      axios
        .get(store.apiUrl + store.apiSearch + store.apiMovie + store.apiKey, {
          params: {
            query: store.inputSearch,
          },
        })
        .then((response) => this.getMovies(response));
    },

    apiSearchSeries() {
      axios
        .get(store.apiUrl + store.apiSearch + store.apiTv + store.apiKey, {
          params: {
            query: store.inputSearch,
          },
        })
        .then((response) => this.getSeries(response));
    },

    searchItems() {
      store.loading = true;
      this.apiSearchMovie();
      this.apiSearchSeries();
      store.loading = false;
    },
  },
};
</script>

<template>
  <AppHeader @search="searchItems" />
  <AppMain />
</template>

<style scoped></style>
