import { reactive } from "vue";

export const store = reactive({
  // API
  loading: false,
  apiUrl: "https://api.themoviedb.org/3",
  apiKey: "b875ad765049fffffbab8ac9601a041f",
  apiSearchMovie: "/search/movie",
  apiSearchSeries: "/search/tv",
  apiSearchActors: "credits",

  // INPUTS
  inputSearch: "",

  // DATA
  movies: [],
  series: [],
  genre_ids: [],
});
