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
            append_to_response: store.apiSearchActors,
          },
        })
        .then((response) => this.getMovies(response));
    },

    apiSearchSeries() {
      axios
        .get(store.apiUrl + store.apiSearchSeries, {
          params: {
            api_key: store.apiKey,
            query: store.inputSearch,
          },
        })
        .then((response) => this.getSeries(response));
    },

    apiGetActors() {
      console.log(store.movies.id);
      store.movies.forEach((movie, index) => {
        //console.log(movie);
        // axios.get(store.apiUrl +"/movie/" + movie[index].id + "/credits").then((response) => this.getSeries(response));
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${store.apiKey}`
          )
          .then((response) => this.getMoviesActors(response));
        // {
        //   const cast = response.data.cast;
        //   const crew = response.data.crew;

        //   //console.log(response);
        //   movie.cast = cast;
        //   movie.crew = crew;
        //   console.log(movie);

        //   //store.moviesActors[index] = response;
        //   console.log(response);
        // }
      });
    },
    searchItems() {
      store.loading = true;
      this.apiSearchMovie();
      this.apiSearchSeries();
      this.apiGetActors();
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
