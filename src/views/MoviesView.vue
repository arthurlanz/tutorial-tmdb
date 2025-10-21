<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios';
  import Loading from 'vue-loading-overlay';
  import { useGenreStore } from '@/stores/genre.js';
  import { useRouter } from 'vue-router';

  const router = useRouter();
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
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listMovies(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
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
            v-for="genre_id in movie.genre_ids"
            :key="genre_id"
            @click="listMovies(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-bottom: 3rem;
}

.genre-item {
  background-color: var(--card-background, #1c1c1c);
  border: 1px solid var(--border-color, #333);
  border-radius: 30px;
  padding: 0.6rem 1.2rem;
  color: var(--text-muted, #aaa);
  font-weight: 500;
  transition: all 0.3s ease;
}

.genre-item:hover {
  cursor: pointer;
  background-color: var(--secondary-color, #4a00e0);
  color: #fff;
  transform: scale(1.05);
}
.genre-item.active {
  background: var(--primary-gradient, linear-gradient(to right, #8e2de2, #4a00e0));
  color: #fff;
  font-weight: 600;
  border-color: var(--primary-color);
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  padding: 0;
  padding-bottom: 5rem;
}

.movie-card {
  background-color: var(--card-background, #1c1c1c);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
}

.movie-card img {
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3; 
  object-fit: cover;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color, #333);
}

.movie-details {
  padding: 1rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-color, #f0f0f0);
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3.1rem;
}

.movie-release-date {
  font-size: 0.9rem;
  color: var(--text-muted, #aaa);
  margin-bottom: 1rem;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.movie-genres span {
  background-color: #333;
  border-radius: 20px;
  padding: 0.3rem 0.6rem;
  color: #ccc;
  font-size: 0.75rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: var(--secondary-color, #4a00e0);
  color: #fff;
}

.movie-genres span.active {
  background: var(--primary-gradient, linear-gradient(to right, #8e2de2, #4a00e0));
  color: #fff;
  font-weight: 600;
}
</style>