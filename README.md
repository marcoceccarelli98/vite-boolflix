#TMDB Key : b875ad765049fffffbab8ac9601a041f

      // axios.get(store.apiUrl +"/movie/" + movie[index].id + "/credits").then((response) => this.getSeries(response));

      // {
      //   const cast = response.data.cast;
      //   const crew = response.data.crew;

      //   //console.log(response);
      //   movie.cast = cast;
      //   movie.crew = crew;
      //   console.log(movie);

      //   //store.moviesActors[index] = response;
      //   console.log(response);
      // }

// apiSearchSeries() {
// store.loading = true;
// axios
// .get(store.apiUrl + store.apiSearchSeries, {
// params: {
// api_key: store.apiKey,
// query: store.inputSearch,
// },
// })
// .then((response) => {
// store.series = response.data.results;
// // IMPORTANT!!! Using apiGetActors after received the movie data from apiSearchMovie
// store.series.forEach((serie, index) => {
// this.apiGetInfo(serie, index);
// // -------------
// // APPLY FILTERS
// // -------------
// if (store.filters.filterOn) {
// if (this.checkFilter(serie)) {
// store.filtSeries.push(serie);
// }
// }
// });
// if (!store.filters.filterOn) {
// store.filtSeries = store.series;
// }
// store.loading = false;
// })
// .catch((error) => {
// console.log("Search Series ERROR : ", error);
// });
// },

    // apiGetInfo(obj, index) {
    //   let searchType = "/tv/";
    //   //Check if the obj passed from a search contain title or not to determinate if is a movie or a series
    //   if ("title" in obj) {
    //     searchType = "/movie/";
    //   }

    //   //API CALL with auto determination of movie or series
    //     axios.get(`https://api.themoviedb.org/3${searchType}${obj.id}?api_key=b875ad765049fffffbab8ac9601a041f`,{
    //         params: {
    //           //Add to detail call, the credits to get the cast of the film id
    //           append_to_response: "credits",
    //         },
    //       }
    //     ).then((response) => {
    //       //Check if movie or series and put the response of the call in the right place
    //       if ("title" in obj) {
    //         store.movies[index] = response.data;
    //       } else {
    //         store.series[index] = response.data;
    //       }
    //     }).catch((error) => {
    //       console.log("Get Info ERROR : ", error);
    //     });
    // }

    // checkFilter(item) {
    //       // GENRE
    //       // console.log("store.movies:", store.movies); // Aggiunto log
    //       if (item.genre_ids.includes(store.filters.genre.filterId)) {
    //         console.log("item : " + item.title);
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
