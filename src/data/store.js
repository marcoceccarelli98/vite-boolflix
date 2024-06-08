import { reactive } from "vue";

export const store = reactive({
  // DEBUG
  // debug: true,//turn on debug mode
  debug: false, //turn off debug mode

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
  genres: [],

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
});
