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
      console.log(store.series);
    },
    // ------------
    //  GET GENRES
    // ------------
    getGenres() {
      axios
        .get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: store.apiKey,
          },
        })
        .then((response) => {
          store.genres = response;
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
            this.apiGetInfo(movie, index);
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
          // IMPORTANT!!! Using apiGetActors after received the movie data from apiSearchMovie
          store.series.forEach((serie, index) => {
            this.apiGetInfo(serie, index);
          });
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
          //console.log(response.data);
          //store.loading = false;
        })
        .catch((error) => {
          console.log("Search Actors ERROR : ", error);
        });
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
