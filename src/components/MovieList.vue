<script>
import AppCard from "./AppCard.vue";
export default {
  name: "MovieList",
  components: {
    AppCard,
  },

  props: {
    movies: {
      type: Array,
    },
  },

  methods: {},
};
</script>

<template>
  <div class="list">
    <AppCard
      v-for="movie in movies"
      :poster="movie.poster_path"
      :title="movie.title"
      :originalTitle="movie.original_title"
      :language="movie.original_language"
      :vote="movie.vote_average"
      :info="movie.info"
    />
  </div>
</template>

<style scoped></style>
