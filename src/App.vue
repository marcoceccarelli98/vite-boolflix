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
    testLog() {
      console.log(store.movies);
    },

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

    apiGetActors(movie, index) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b875ad765049fffffbab8ac9601a041f`
        )
        .then((response) => {
          // console.log(this.cast);
          store.movies[index].cast = response.data.cast;
          console.log(response.data.cast);
        })
        .catch((error) => {
          console.log("Search Actors ERROR");
        });
    },

    searchItems() {
      store.loading = true;
      // GET MOVIES
      this.apiSearchMovie();
      // GET SERIES
      this.apiSearchSeries();

      // GET ACTORS
      store.movies.forEach((movie, index) => {
        //console.log(movie.id);
        this.apiGetActors(movie, index);
      });
      store.loading = false;
    },
    // }
  },
};
</script>

<template>
  <AppHeader @test="testLog()" @search="searchItems" />
  <AppMain />
</template>

<style scoped></style>
