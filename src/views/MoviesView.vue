<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios';
  import Loading from 'vue-loading-overlay';
  import { useGenreStore } from '@/stores/genre.js';
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const genreStore = useGenreStore();
  const genres = ref([]);
  const movies = ref([]);
  const isLoading = ref(false);


  const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');


  function getGenreName(id) {
    const genero = genres.value.find((genre) => genre.id === id);
    return genero.name;
  }

  function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}
  
  onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});

  onMounted(async () => {
    const response = await api.get('genre/movie/list?language=pt-BR');
    genres.value = response.data.genres;
    });

    const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};
      
      </script>

<template>
    <h1>Filmes</h1>
    <ul class="genre-list">
      <li
        v-for="genre in genreStore.genres":key="genre.id" @click="listMovies(genre.id)" class="genre-item" :class="{ active: genre.id === genreStore.currentGenreId }">
       {{ genre.name }}
     </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            @click="openMovie(movie.id)"
          />
            <div class="movie-details">
            <p class="movie-title">{{ movie.title }}</p>
            <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
            <p class="movie-genres">
            <span
              v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)" :class="{ active: genre_id === genreStore.currentGenreId }">
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </p>
            </div>
        </div>
    </div>
  </template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 2vw 2vw 0 0;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: slateblue;
  border-radius: 30px;
  padding: 0.7rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #a352ff;
  box-shadow: 0 0 0.5rem #703ecc;
}

.movie-list {
display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 4vw;
  padding-bottom: 16vw;
  
}

.movie-card {
  width: 14rem;
  height: 35rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  justify-content: center;
  margin-bottom: 3rem;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000000;
}

.movie-details {
  padding: 0 1rem;
  background-color: #0000;
  border-radius: 20px;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  margin: 0 0 1rem 0;
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  margin-top: 1.3rem;
}

.movie-genres span {
  background-color: slateblue;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #a352ff;
  box-shadow: 0 0 0.5rem rgb(120, 107, 206);
}

.active {
  background-color: #ffffff;
  font-weight: bolder;
  color: #000;
}

.movie-genres span.active {
  background-color: #ffffff;
  color: #000;
  font-weight: bolder;
}
</style>