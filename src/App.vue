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
      console.log("SERIES :" + store.series);
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

    // async apiSearchMovies() {
    //   store.loading = true;
    //   try {
    //     const response = await axios.get(store.apiUrl + store.apiSearchMovies, {
    //       params: {
    //         api_key: store.apiKey,
    //         query: store.inputSearch,
    //       },
    //     });

    //     store.movies = response.data.results;
    //     try {
    //       store.movies.forEach((movie) => {
    //         apiGetInfo(movie);
    //       });
    //     } catch (error) {
    //       console.log("Search Movie Info : ", error);
    //     }
    //     await Promise.all(infoPromises);
    //   } catch (error) {
    //     console.log("Search Movie ERROR : ", error);
    //   } finally {
    //     store.loading = false;
    //   }
    // },

    async apiSearchSeries() {
      store.loading = true;
      console.log("LOOOOOOOOOOOOOOOOOL");
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

    async apiGetInfo(obj, index) {
      let searchType = "/tv/";
      //Check if the obj passed from a search contain title
      //or not to determinate if is a movie or a series
      if ("title" in obj) {
        searchType = "/movie/";
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3${searchType}${obj.id}?api_key=b875ad765049fffffbab8ac9601a041f`,
          {
            params: {
              //Add to detail call, the credits to get the cast of the film id
              append_to_response: "credits",
            },
          }
        );
        //Check if movie or series and put the response
        //of the call in the right place
        if ("title" in obj) {
          store.movies[index] = response.data;
        } else {
          store.series[index] = response.data;
        }
      } catch (error) {
        console.log("Get Info ERROR : ", error);
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
