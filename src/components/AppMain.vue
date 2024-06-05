<script>
import axios from "axios";
import { store } from "../data/store.js";
export default {
  name: "AppMain",
  components: {},

  data() {
    return {
      store,
    };
  },
  methods: {},
  created() {},
};
</script>

<template>
  <main>
    <ul>
      <!-- MOVIES -->
      <li v-for="item in store.movies">
        <ul>
          <li>{{ item.title }}</li>
          <li>{{ item.original_title }}</li>
          <li>
            <img
              :src="'/public/flags/' + item.original_language + '.svg'"
              :alt="item.original_language"
            />
          </li>
          <li>{{ item.vote_average }}</li>
        </ul>
      </li>
      <!-- SERIES -->
      <li v-for="item in store.series">
        <ul>
          <li>{{ item.name }}</li>
          <li>{{ item.original_name }}</li>
          <li>
            <img
              :src="'/public/flags/' + item.original_language + '.svg'"
              :alt="item.original_language"
            />
          </li>
          <li>{{ item.vote_average }}</li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<style scoped>
img {
  width: 30px;
}
</style>
