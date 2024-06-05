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
      <li v-for="item in store.results">
        <ul>
          <li>{{ item.title }}</li>
          <li>{{ item.original_title }}</li>
          <li>{{ item.original_language }}</li>
          <li>{{ item.vote_average }}</li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
