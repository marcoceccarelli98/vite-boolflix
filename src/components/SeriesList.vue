<script>
import AppCard from "./AppCard.vue";
export default {
  name: "SeriesList",
  components: {
    AppCard,
  },

  props: {
    series: {
      type: Array,
    },
  },

  methods: {},
};
</script>

<template>
  <div class="list">
    <AppCard
      v-for="serie in series"
      :poster="serie.poster_path"
      :title="serie.name"
      :originalTitle="serie.original_name"
      :language="serie.original_language"
      :vote="serie.vote_average"
      :credits="serie.credits"
      :genres="serie.genres"
    />
  </div>
</template>

<style scoped></style>
