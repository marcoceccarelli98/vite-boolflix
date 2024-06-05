import { reactive } from "vue";

export const store = reactive({
  loading: false,
  apiUrl: "https://developers.themoviedb.org/3",
  apiKey: "?api_key=b875ad765049fffffbab8ac9601a041f",
  apiSearch: "/search",
  apiMovie: "/movie",
  apiQuery: "&query=",
  inputSearch: "",
});
