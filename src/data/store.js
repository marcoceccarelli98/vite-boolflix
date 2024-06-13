import { reactive } from "vue";

export const store = reactive({
  // DEBUG
  debug: true, //turn on debug mode
  // debug: false, //turn off debug mode
  c: 0,

  // API
  loading: false,
  apiUrl: "https://api.themoviedb.org/3",
  apiKey: "b875ad765049fffffbab8ac9601a041f",
  apiSearchMovie: "/search/movie",
  apiSearchSeries: "/search/tv",
  apiInfoMovie: "/movie/",
  apiInfoSeries: "/tv/",

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
      isActive: true,
    },
    {
      name: "Series",
      isActive: false,
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
