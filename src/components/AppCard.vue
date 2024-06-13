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
    genres: {
      type: Array,
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
      v-if="poster != null"
      class="poster-image"
      :src="'https://image.tmdb.org/t/p/w342' + poster"
      :alt="title + ' poster'"
    />
    <div class="noImage" v-else>IMAGE NOT FOUND</div>
    <!-- DETAILS -->
    <ul class="details">
      <!-- TITLE -->
      <li>
        <h3 class="mb-10">{{ "Title: " + title }}</h3>
      </li>
      <!-- /TITLE -->
      <!-- ORIGINAL TITLE -->
      <li v-if="title != originalTitle">
        <h4 class="mb-15">{{ "Original Title: " + originalTitle }}</h4>
      </li>
      <!-- /ORIGINAL TITLE -->
      <!-- LANGUAGE -->
      <li class="mb-15 flex align-center">
        <span>Language:</span>
        <img
          :src="'/public/flags/' + language + '.svg'"
          :alt="language"
          class="flag inline-block"
        />
      </li>
      <!-- /LANGUAGE -->
      <!-- VOTE -->
      <li class="mb-15"><StarsVote :vote="vote" /></li>
      <!-- /VOTE -->
      <!-- CAST -->
      <li class="text-list mb-15" v-if="credits">
        <ul v-show="credits.length > 0">
          Cast:
          <li v-for="actor in credits.cast.slice(0, 5)">
            {{ actor.name }}
          </li>
        </ul>
      </li>
      <!-- /CAST -->
      <!-- GENRES -->
      <li class="text-list mb-15" v-if="genres">
        <ul v-show="genres.length > 0">
          Genres:
          <li v-for="genre in genres">
            {{ genre.name }}
          </li>
        </ul>
      </li>
      <!-- /GENRES -->
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
  overflow-y: hidden;
  // HOVER EFFECT
  &:hover {
    .poster-image,
    .noImage {
      display: none;
    }
    .details {
      display: inline-block;
    }
  }
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
  .text-list {
    line-height: 20px;
    li:first-of-type {
      margin-top: 5px;
    }
  }
}

// Language Flag
.flag {
  width: 30px;
  margin-left: 10px;
}
</style>
