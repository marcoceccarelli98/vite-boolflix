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
      console.log(store.series);
    },

    // ------------
    //  ASSIGNMENT
    // ------------
    getMovies(response) {
      store.movies = response.data.results;
      //console.log(store.movies);
    },
    getSeries(response) {
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
        .then((response) => {
          store.movies = response.data.results;
          // IMPORTANT!!! Using apiGetActors after received the movie data from apiSearchMovie
          store.movies.forEach((movie, index) => {
            this.apiGetActors(movie, index);
          });
        })
        .catch((error) => {
          console.log("Search Movie ERROR : ", error);
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
        .then((response) => {
          store.series = response.data.results;
          console.log(response.data.results);
        })
        .catch((error) => {
          console.log("Search Series ERROR : ", error);
        });
    },

    // WORKING WITH DOUBLE CLICK SEARCH

    apiGetActors(movie, index) {
      store.movies.forEach((movie, index) => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b875ad765049fffffbab8ac9601a041f`
          )
          .then((response) => {
            store.movies[index].cast = response.data.cast;
            console.log(response.data.cast);
          })
          .catch((error) => {
            console.log("Search Actors ERROR : ", error);
          });
      });
    },

    searchItems() {
      // Set loading mem true at the start of the research
      store.loading = true;

      // GET MOVIES
      this.apiSearchMovie();
      // GET SERIES
      this.apiSearchSeries();

      // Set loading mem false at the end of the research
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
