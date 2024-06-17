import { reactive } from "vue";

import { apiInfo } from "../config/api";

export const store = reactive({
  // DEBUG
  debug: true, //turn on debug mode
  // debug: false, //turn off debug mode

  // IMPORTED
  apiInfo,

  loading: false,

  // INPUTS
  inputSearch: "",

  // DATA
  movies: [],
  series: [],
  moviesGenres: [],
  seriesGenres: [],

  filtMovies: [],
  filtSeries: [],

  //HUD
  menu: [
    {
      name: "Movies",
      isActive: 1,
    },
    {
      name: "Series",
      isActive: 0,
    },
  ],

  // FILTERS
  filters: {
    filterOn: false,
    // GENRES
    genre: {
      filterId: 0,
      hideShow: false,
    },
  },
});
