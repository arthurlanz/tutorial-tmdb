<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios';
  import Loading from 'vue-loading-overlay';
  import { useGenreStore } from '@/stores/genre';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const genreStore = useGenreStore();
  const genres = ref([]);
  const tv = ref([]);
  const isLoading = ref(false);

  const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

  function getGenreName(id) {
    const genero = genres.value.find((genre) => genre.id === id);
    return genero.name;
  }

  function openTv(tvId) {
    router.push({ name: 'TvDetails', params: { tvId } });
  }

  onMounted(async () => {
    const response = await api.get('genre/tv/list?language=pt-BR');
    genres.value = response.data.genres;
  });

  onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres('tv');
    isLoading.value = false;
  });

  const listTv = async (genreId) => {
    genreStore.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/tv', {
      params: {
        with_genres: genreId,
        language: 'pt-BR',
      },
    });
    tv.value = response.data.results;
    isLoading.value = false;
  };
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listTv(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="tv-list">
    <div v-for="t in tv" :key="t.id" class="tv-card">
      <img
        :src="`https://image.tmdb.org/t/p/w500${t.poster_path}`"
        :alt="t.name"
        @click="openTv(t.id)"
      />
      <div class="tv-details">
        <p class="tv-title">{{ t.name }}</p>
        <p class="tv-release-date">{{ formatDate(t.first_air_date) }}</p>
        <p class="tv-genres">
          <span
            v-for="genre_id in t.genre_ids"
            :key="genre_id"
            @click="listTv(genre_id)"
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

.tv-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  padding: 0;
  padding-bottom: 5rem;
}

.tv-card {
  background-color: var(--card-background, #1c1c1c);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tv-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
}

.tv-card img {
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color, #333);
}

.tv-details {
  padding: 1rem;
}

.tv-title {
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

.tv-release-date {
  font-size: 0.9rem;
  color: var(--text-muted, #aaa);
  margin-bottom: 1rem;
}

.tv-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tv-genres span {
  background-color: #333;
  border-radius: 20px;
  padding: 0.3rem 0.6rem;
  color: #ccc;
  font-size: 0.75rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: var(--secondary-color, #4a00e0);
  color: #fff;
}

.tv-genres span.active {
  background: var(--primary-gradient, linear-gradient(to right, #8e2de2, #4a00e0));
  color: #fff;
  font-weight: 600;
}
</style>