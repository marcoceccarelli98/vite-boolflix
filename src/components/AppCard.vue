<script>
import StarsVote from "./StarsVote.vue";
export default {
  name: "AppCard",
  components: {
    StarsVote,
  },
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
    credits: {
      type: Object,
      required: false,
    },
  },

  // METHODS
  methods: {},
};
</script>

<template>
  <div class="card-container">
    <!-- POSTER -->
    <img
      class="poster-image"
      :src="'https://image.tmdb.org/t/p/w342' + poster"
      :alt="title + ' poster'"
    />
    <!-- DETAILS -->
    <ul class="details">
      <!-- TITLE -->
      <li>
        <h3 class="mb-10">{{ "Title: " + title }}</h3>
      </li>
      <!-- ORIGINAL TITLE -->
      <li v-if="title != originalTitle">
        <h4 class="mb-15">{{ "Original Title: " + originalTitle }}</h4>
      </li>
      <!-- LANGUAGE -->
      <li class="mb-15 flex align-center">
        <span>Language:</span>
        <img
          :src="'/public/flags/' + language + '.svg'"
          :alt="language"
          class="flag inline-block"
        />
      </li>
      <!-- VOTE -->
      <li><StarsVote :vote="vote" /></li>
      <!-- CAST -->
      <li v-if="credits">
        <ul>
          Cast:
          <li v-for="actor in credits.cast.slice(0, 5)">
            {{ actor.name }}
          </li>
        </ul>
      </li>
      <li v-else>Caricamento...</li>
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

.poster-image {
  width: 342px;
  height: 512px;
}
// TEXT DETAILS
.details {
  color: white;
  padding: 30px;
  display: none;
}

// Language Flag
.flag {
  width: 30px;
  margin-left: 10px;
}

// HOVER EFFECT
.card-container:hover img.poster-image {
  display: none;
}

.card-container:hover .details {
  display: inline-block;
}
</style>
