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
      timer: 0,
      interval: null,
      timeout: null,
    };
  },

  created() {
    this.getMovieGenres();
    this.getSeriesGenres();
    // this.$watch("store.toggleSearch", () => this.searchItems());
  },

  // watch: {
  //   async (store.inputSearch) {
  //     if (newQuery) {
  //       await this.searchItems();
  //     }
  //   },
  // },

  methods: {
    searchKeyPressDelay() {
      // Cancella il timeout precedente
      clearTimeout(this.timeout);

      // Imposta un nuovo timeout che chiama receiveSignal dopo 1 secondo
      this.timeout = setTimeout(() => {
        this.searchItems();
      }, 250);
    },

    // DEBUG
    testLog() {
      console.log(store.movies);
      console.log(store.series);
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
        // console.log("1: " + store.movies);
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
        // Wait untill all Promise resolved
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

        // Array of promises for info call
        const infoPromises = store.series.map((serie) =>
          axios
            .get(store.apiUrl + "/tv/" + serie.id, {
              params: {
                api_key: store.apiKey,
                append_to_response: "credits",
              },
            })
            .then((response) => {
              serie.info = {
                credits: response.data.credits,
                genres: response.data.genres,
              };
            })
            .catch((seriesInfoError) => {
              console.log(
                `Error fetching details for serie ID ${serie.id}:`,
                seriesInfoError
              );
            })
        );
        // Wait untill all Promise resolved
        await Promise.all(infoPromises);
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
  <AppHeader
    @test="testLog()"
    @search="searchItems"
    @searchKeyDown="searchKeyPressDelay"
  />
  <AppMain />
</template>

<style scoped></style>
