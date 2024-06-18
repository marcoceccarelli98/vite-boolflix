<script>
import { store } from "../data/store.js";
export default {
  name: "AppHeader",
  emits: ["search", "test", "searchKeyDown"],
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
          console.log(i == 0 ? "Movies" : "Series");
        } else {
          item.isActive = false;
        }
      });
    },

    toggleFilter() {
      this.showFilter = !this.showFilter;
      this.checkFilterOn();
    },

    checkFilterOn() {
      if (this.showFilter && store.filters.genre.filterId > 0) {
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
            @click.prevent="setActive(index), $emit('search')"
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
          @keydown="$emit('searchKeyDown')"
          type="text"
          v-model="store.inputSearch"
        />
        <!-- SEARCH BUTTON -->
        <button @click="$emit('search')">Search</button>
      </div>
    </div>
    <!-- FILTER -->
    <div v-show="this.showFilter" class="filter-container">
      <div class="genre">
        <label for="genreFilter">Genres</label>
        <select
          @change="checkFilterOn"
          v-model="store.filters.genre.filterId"
          name="genreFilter"
        >
          <option value="0">None</option>
          <!-- MOVIE GENRES OPTION -->
          <option
            v-if="store.menu[0].isActive"
            v-for="genre in store.moviesGenres"
            :value="genre.id"
          >
            {{ genre.name }}
          </option>
          <!-- MOVIE SERIES OPTION -->
          <option
            v-else="store.menu[1].isActive"
            v-for="genre in store.seriesGenres"
            :value="genre.id"
          >
            {{ genre.name }}
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: sticky;
  left: 0;
  right: 0;
  padding-top: 15px;
  justify-content: space-between;
  background-color: black;
  //height: 80px;
  &.showFilter {
    display: block;
    height: 200px;
  }
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
  a {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    color: rgb(230, 230, 230);
    margin-right: 10px;
    margin-left: 10px;
    font-size: 15px;
  }
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
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  select {
    padding: 10px;
  }
  option {
    font-size: 15px;
  }
  label {
    display: block;
    color: white;
    padding: 2px 10px;
  }
}
</style>
