<script>
export default {
  name: "StarsVote",
  props: {
    vote: {
      type: Number,
      required: true,
    },
  },

  // METHODS
  methods: {
    //Convert the float vote from 0 to 10 to an int vote from 0 to 5 for the star rappresentation
    fromVoteToStars(vote) {
      return Math.round(vote / 2);
    },
  },
};
</script>

<template>
  <!-- VOTE -->
  <i class="fas fa-star" v-for="n in fromVoteToStars(vote)"></i>
  <i class="fa-regular fa-star" v-for="n in 5 - fromVoteToStars(vote)"></i>
</template>

<style scoped lang="scss"></style>
