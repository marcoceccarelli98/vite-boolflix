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
    getData(response) {
      store.results = response.data.results;
      store.loading = false;
      console.log(response.data.results);
    },

    apiCall() {
      store.loading = true;
      axios
        .get(store.apiUrl + store.apiSearch + store.apiMovie + store.apiKey, {
          params: {
            query: store.inputSearch,
          },
        })
        .then((response) => this.getData(response));
    },
  },
};
</script>

<template>
  <AppHeader @search="apiCall" />
  <AppMain />
</template>

<style scoped></style>
