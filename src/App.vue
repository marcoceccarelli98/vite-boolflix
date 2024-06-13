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

  created() {
    this.getMovieGenres();
    this.getSeriesGenres();
    this.$watch("store.inputSearch", () => this.searchItems());
    this.$watch("store.toggleSearch", () => this.searchItems());
  },

  // watch: {
  //   async (store.inputSearch) {
  //     if (newQuery) {
  //       await this.searchItems();
  //     }
  //   },
  // },

  methods: {
    // DEBUG
    testLog() {
      console.log("MOVIES :" + store.movies);
      console.log("SERIES :" + store.series.info);
      // console.log(store.genres);
      // console.log(store.filters.filterOn);
      // console.log(store.moviesGenres);
    },

    // ------------
    //  GET GENRES
    // ------------
    getMovieGenres() {
      store.loading = true;
      axios
        .get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: store.apiKey,
          },
        })
        .then((response) => {
          store.moviesGenres = response.data.genres;
          store.loading = false;
        })
        .catch((error) => {
          console.log("Get Genres ERROR : ", error);
        });
    },

    getSeriesGenres() {
      store.loading = true;
      axios
        .get("https://api.themoviedb.org/3/genre/tv/list", {
          params: {
            api_key: store.apiKey,
          },
        })
        .then((response) => {
          store.seriesGenres = response.data.genres;
          store.loading = false;
        })
        .catch((error) => {
          console.log("Get Genres ERROR : ", error);
        });
    },

    // --------
    //  SEARCH
    // --------
    async searchItems() {
      if (store.menu[0].isActive) {
        // GET MOVIES
        await this.apiSearchMovies();
      } else {
        // GET SERIES
        await this.apiSearchSeries();
      }
    },

    // ------------------------ SEARCH MOVIES ------------------------

    async apiSearchMovies() {
      store.loading = true;
      try {
        // Prima chiamata per cercare i film
        const response = await axios.get(store.apiUrl + store.apiSearchMovie, {
          params: {
            api_key: store.apiKey,
            query: store.inputSearch,
          },
        });

        // Save results in store
        store.movies = response.data.results;
        console.log("1: " + store.movies);
        // Array of promises for info call
        const infoPromises = store.movies.map((movie) =>
          axios
            .get(store.apiUrl + "/movie/" + movie.id, {
              params: {
                api_key: store.apiKey,
                append_to_response: "credits",
              },
            })
            .then((response) => {
              movie.info = {
                credits: response.data.credits,
                genres: response.data.genres,
              };
            })
            .catch((movieInfoError) => {
              console.log(
                `Error fetching details for movie ID ${movie.id}:`,
                movieInfoError
              );
            })
        );
        // Attendi che tutte le promesse siano risolte
        await Promise.all(infoPromises);
      } catch (error) {
        console.log("Search Movie ERROR:", error);
      } finally {
        store.loading = false;
      }
    },

    // ------------------------ SEARCH SERIES ------------------------

    async apiSearchSeries() {
      store.loading = true;
      try {
        const response = await axios.get(store.apiUrl + store.apiSearchSeries, {
          params: {
            api_key: store.apiKey,
            query: store.inputSearch,
          },
        });
        store.series = response.data.results;
      } catch (error) {
        console.log("Search Series ERROR : ", error);
      } finally {
        store.loading = false;
      }
    },
  },
};
</script>

<template>
  <AppHeader @test="testLog()" @search="searchItems" />
  <AppMain />
</template>

<style scoped></style>
