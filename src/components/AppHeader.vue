<script>
import { store } from "../data/store.js";
export default {
  name: "AppHeader",
  emits: ["search", "test"],
  data() {
    return {
      store,
      showFilter: true,
    };
  },

  methods: {
    setActive(index) {
      store.menu.forEach((item, i) => {
        if (index === i) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },

    checkUseFilter() {
      if (store.filters.genre.filterId != 0) {
        store.filters.filterOn = true;
      } else {
        store.filters.filterOn = false;
      }
    },
  },
};
</script>

<template>
  <header :class="{ showFilter: this.showFilter }">
    <div class="container flex j-between">
      <div class="left-content">
        <div class="logo">
          <span>BOOLFLIX</span>
        </div>
        <!-- MENU -->
        <nav>
          <a
            v-for="(item, index) in store.menu"
            :class="{ active: item.isActive }"
            @click.prevent="setActive(index)"
            >{{ item.name }}</a
          >
        </nav>
        <!-- DEBUG -->
        <div v-if="store.debug">
          <button @click="$emit('test')">TEST</button>
        </div>
      </div>
      <!-- RESEARCH -->
      <div class="research">
        <!-- FILTER BUTTON -->
        <a @click.prevent="toggleFilter()" class="filter-icon">
          <i class="fas fa-filter"></i>
        </a>
        <!-- INPUT -->
        <input
          @keyup.enter="$emit('search')"
          type="text"
          v-model="store.inputSearch"
        />
        <!-- SEARCH BUTTON -->
        <button @click="$emit('search')">Search</button>
      </div>
    </div>
    <!-- FILTER -->
    <div v-show="this.showFilter" class="filter-container">
      <select
        @change="checkUseFilter"
        v-model="store.filters.genre.filterId"
        name="genreFilter"
      >
        <option value="0">None</option>
        <option v-for="genre in store.genres" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  left: 0;
  right: 0;
  padding-top: 15px;
  justify-content: space-between;
  background-color: black;
  height: 80px;
}

header.showFilter {
  display: block;
  height: 200px;
}

.left-content {
  display: flex;
}

/* LOGO */
.logo {
  font-family: Arial, Helvetica, sans-serif;
  color: red;
  font-size: 40px;
}

/* MENU */
nav {
  margin-left: 50px;
  display: flex;
  align-items: center;
}

nav a {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: rgb(230, 230, 230);
  margin-right: 10px;
  margin-left: 10px;
  font-size: 15px;
}

.active {
  color: white;
  font-weight: 501;
  font-size: 20px;
}

/* SEARCH BAR */
.research {
  display: flex;
  align-items: center;
}

.filter-icon {
  color: white;
  font-size: 20px;
  margin-right: 10px;
}

input {
  margin-right: 10px;
  height: 30px;
  font-size: 15px;
}

button {
  /* height: 25px; */
  padding: 5px 5px;
}

/* ------------ */
/*    FILTER    */
/* ------------ */
.filter-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.filter-container select {
  padding: 10px;
}

.filter-container option {
  font-size: 15px;
}
</style>
