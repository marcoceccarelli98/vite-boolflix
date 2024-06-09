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
    this.getGenres();
  },

  methods: {
    // DEBUG
    testLog() {
      // console.log(store.Movies);
      // console.log(store.series);
      // console.log(store.genres);
      // console.log(store.filters.filterOn);
      console.log(store.filtMovies);
    },

    // ------------
    //  GET GENRES
    // ------------
    getGenres() {
      store.loading = true;
      axios
        .get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: store.apiKey,
          },
        })
        .then((response) => {
          store.genres = response.data.genres;
          store.loading = false;
        })
        .catch((error) => {
          console.log("Get Genres ERROR : ", error);
        });
    },
    // --------
    //  SEARCH
    // --------
    searchItems() {
      // GET MOVIES
      this.apiSearchMovie();
      // GET SERIES
      this.apiSearchSeries();
    },

    apiSearchMovie() {
      store.loading = true;
      store.filtMovies = [];
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
            console.log(index);
            //Add info to every movie
            this.apiGetInfo(movie, index);
            // -------------
            // APPLY FILTERS
            // -------------
            //If filter is on push a filtered element to filtList
            if (store.filters.filterOn) {
              if (this.checkFilter(movie)) {
                store.filtMovies.push(movie);
              }
            }
          });
          if (!store.filters.filterOn) {
            console.log("NOPE");
            store.filtMovies = store.movies;
            console.log(store.filtMovies);
          }
          store.loading = false;
        })
        .catch((error) => {
          console.log("Search Movie ERROR : ", error);
        });
    },

    apiSearchSeries() {
      store.loading = true;
      axios
        .get(store.apiUrl + store.apiSearchSeries, {
          params: {
            api_key: store.apiKey,
            query: store.inputSearch,
          },
        })
        .then((response) => {
          store.series = response.data.results;
          // IMPORTANT!!! Using apiGetActors after received the movie data from apiSearchMovie
          store.series.forEach((serie, index) => {
            this.apiGetInfo(serie, index);
            // -------------
            // APPLY FILTERS
            // -------------
            if (store.filters.filterOn) {
              if (this.checkFilter(serie)) {
                store.filtSeries.push(serie);
              }
            }
          });
          if (!store.filters.filterOn) {
            store.filtSeries = store.series;
          }
          store.loading = false;
        })
        .catch((error) => {
          console.log("Search Series ERROR : ", error);
        });
    },

    apiGetInfo(obj, index) {
      let searchType = "/tv/";
      //Check if the obj passed from a search contain title or not to determinate if is a movie or a series
      if ("title" in obj) {
        searchType = "/movie/";
      }

      //API CALL with auto determination of movie or series
      axios
        .get(
          `https://api.themoviedb.org/3${searchType}${obj.id}?api_key=b875ad765049fffffbab8ac9601a041f`,
          {
            params: {
              //Add to detail call, the credits to get the cast of the film id
              append_to_response: "credits",
            },
          }
        )
        .then((response) => {
          //Check if movie or series and put the response of the call in the right place
          if ("title" in obj) {
            store.movies[index] = response.data;
          } else {
            store.series[index] = response.data;
          }
        })
        .catch((error) => {
          console.log("Get Info ERROR : ", error);
        });
    },

    checkFilter(item) {
      // GENRE
      if (item.genre_ids.includes(store.filters.genre.filterId)) {
        console.log("item : " + item.title);
        return true;
      } else {
        return false;
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
