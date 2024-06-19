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
      // console.log(store.moviesGenres);
      // console.log(store.seriesGenres);
      // console.log(store.filters.filterOn);
    },

    // --------------
    //  GET HOMEPAGE
    // --------------
    async getPopularMovies() {
      //   *TODO
    },

    // ------------
    //  GET GENRES
    // ------------
    getMovieGenres() {
      store.loading = true;
      const url = store.apiInfo.baseUrl + store.apiInfo.endpoints.moviesGenre;
      axios
        .get(url, {
          params: {
            api_key: store.apiInfo.key,
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
      const url = store.apiInfo.baseUrl + store.apiInfo.endpoints.seriesGenre;
      axios
        .get(url, {
          params: {
            api_key: store.apiInfo.key,
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
      } else if (store.menu[1].isActive) {
        // GET SERIES
        await this.apiSearchSeries();
      }
    },

    getInfo(array) {
      const infoPromises = array.map(async (item) => {
        let endpoint;
        if ("title" in item) {
          endpoint = store.apiInfo.endpoints.infoMovie;
        } else {
          endpoint = store.apiInfo.endpoints.infoSeries;
        }
        const url = store.apiInfo.baseUrl + endpoint + item.id;
        try {
          const response = await axios.get(url, {
            params: {
              api_key: store.apiInfo.key,
              language: store.apiInfo.endpoints.lang,
              append_to_response: "credits",
            },
          });
          item.info = {
            credits: response.data.credits,
            genres: response.data.genres,
          };
        } catch (itemInfoError) {
          console.log(
            `Error fetching details for item ID ${item.id}:`,
            itemInfoError
          );
        }
      });
      return infoPromises;
    },

    // ------------------------ SEARCH MOVIES ------------------------

    async apiSearchMovies() {
      // START LOADING
      store.loading = true;
      // GET URL
      const url = store.apiInfo.baseUrl + store.apiInfo.endpoints.searchMovies;
      console.log(url);
      try {
        // First call get films
        const response = await axios.get(url, {
          params: {
            api_key: store.apiInfo.key,
            query: store.inputSearch,
            language: store.apiInfo.endpoints.lang,
          },
        });
        // Save results in store
        store.movies = response.data.results;

        // Array of promises for info call

        const infoPromises = this.getInfo(store.movies);

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
      // START LOADING
      store.loading = true;
      // GET URL
      const url = store.apiInfo.baseUrl + store.apiInfo.endpoints.searchSeries;
      console.log(url);
      try {
        // First call get films
        const response = await axios.get(url, {
          params: {
            api_key: store.apiInfo.key,
            query: store.inputSearch,
            language: store.apiInfo.endpoints.lang,
          },
        });
        // Save results in store
        store.series = response.data.results;

        // Array of promises for info call
        const infoPromises = store.series.map(async (serie) => {
          const url =
            store.apiInfo.baseUrl +
            store.apiInfo.endpoints.infoSeries +
            serie.id;
          try {
            const response = await axios.get(url, {
              params: {
                api_key: store.apiInfo.key,
                language: store.apiInfo.endpoints.lang,
                append_to_response: "credits",
              },
            });
            serie.info = {
              credits: response.data.credits,
              genres: response.data.genres,
            };
          } catch (serieInfoError) {
            console.log(
              `Error fetching details for serie ID ${serie.id}:`,
              serieInfoError
            );
          }
        });
        // Wait untill all Promise resolved
        await Promise.all(infoPromises);
      } catch (error) {
        console.log("Search serie ERROR:", error);
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
