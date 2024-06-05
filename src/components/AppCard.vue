<script>
export default {
  name: "AppCard",
  props: {
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    originalTitle: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    vote: {
      type: Number,
      required: true,
    },
  },
  methods: {
    fromVoteToStars(vote) {
      return Math.round(vote / 2);
    },
  },
  computed: {},
};
</script>

<template>
  <!-- POSTER -->

  <div class="card-container">
    <img
      class="poster-image"
      :src="'https://image.tmdb.org/t/p/w342' + poster"
      :alt="title + ' poster'"
    />
    <ul class="details">
      <!-- TITLE -->
      <li>{{ "Title: " + title }}</li>
      <!-- ORIGINAL TITLE -->
      <li v-if="title != originalTitle">
        {{ "Original Title: " + originalTitle }}
      </li>
      <!-- LANGUAGE -->
      <li class="flex align-center">
        <span>Language:</span>
        <img
          :src="'/public/flags/' + language + '.svg'"
          :alt="language"
          class="flag inline-block"
        />
      </li>
      <!-- VOTE -->
      <li>
        <i class="fas fa-star" v-for="n in fromVoteToStars(vote)"></i>
        <i
          class="fa-regular fa-star"
          v-for="n in 5 - fromVoteToStars(vote)"
        ></i>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  width: 344px;
  height: 514px;
  border: 1px solid white;
  background-color: black;
  color: white;
}

.details {
  display: none;
}

.card-container:hover img.poster-image {
  display: none;
}

.card-container:hover .details {
  display: inline-block;
}

.flag {
  width: 30px;
  margin-left: 10px;
}
</style>
