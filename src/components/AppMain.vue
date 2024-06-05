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
  methods: {
    fromVoteToStars(vote) {
      return Math.round(vote / 2);
    },
  },
  created() {},
};
</script>

<template>
  <main>
    <ul>
      <!-- ------------------ -->
      <!-- ----- MOVIES ----- -->
      <!-- ------------------ -->
      <li v-for="item in store.movies">
        <ul>
          <!-- TITLE -->
          <li>{{ item.title }}</li>
          <!-- ORIGINAL TITLE -->
          <li>{{ item.original_title }}</li>
          <!-- POSTER -->
          <li>
            <img
              :src="'https://image.tmdb.org/t/p/w342' + item.poster_path"
              :alt="item.title + ' poster'"
            />
          </li>
          <!-- LANGUAGE -->
          <li>
            <img
              :src="'/public/flags/' + item.original_language + '.svg'"
              :alt="item.original_language"
              class="language"
            />
          </li>
          <!-- VOTE -->
          <li>
            <i
              class="fas fa-star"
              v-for="n in fromVoteToStars(item.vote_average)"
            ></i>
            <i
              class="fa-regular fa-star"
              v-for="n in 5 - fromVoteToStars(item.vote_average)"
            ></i>
          </li>
        </ul>
      </li>
      <!-- ------------------ -->
      <!-- ----- SERIES ----- -->
      <!-- ------------------ -->
      <li v-for="item in store.series">
        <ul>
          <!-- NAME -->
          <li>{{ item.name }}</li>
          <!-- ORIGINAL NAME -->
          <li>{{ item.original_name }}</li>
          <!-- POSTER -->
          <li>
            <img
              :src="'https://image.tmdb.org/t/p/w342' + item.poster_path"
              :alt="item.title + ' poster'"
            />
          </li>
          <!-- LANGUAGE -->
          <li>
            <img
              :src="'/public/flags/' + item.original_language + '.svg'"
              :alt="item.original_language"
              class="language"
            />
          </li>
          <!-- VOTE -->
          <li>
            <i
              class="fas fa-star"
              v-for="n in fromVoteToStars(item.vote_average)"
            ></i>
            <i
              class="fa-regular fa-star"
              v-for="n in 5 - fromVoteToStars(item.vote_average)"
            ></i>
          </li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.language {
  width: 30px;
}
</style>
