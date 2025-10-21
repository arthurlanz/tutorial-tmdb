<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios';
  import Loading from 'vue-loading-overlay';
  import { useGenreStore } from '@/stores/genre';
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
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
  })

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
        v-for="genre in genreStore.genres":key="genre.id" @click="listTv(genre.id)" class="genre-item" :class="{ active: genre.id === genreStore.currentGenreId }">
       {{ genre.name }}
     </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="tv-list">
  <div v-for="tv in tv" :key="tv.id" class="tv-card">
    <img
      :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
      :alt="tv.title"
      @click="openTv(tv.id)"
    />
    <div class="tv-details">
      <p class="tv-title">{{ tv.name }}</p>
      <p class="tv-release-date">{{formatDate(tv.first_air_date)}}</p>
      <p class="tv-genres">
        <span
           v-for="genre_id in tv.genre_ids" :key="genre_id" @click="listTv(genre_id)" :class="{ active: genre_id === genreStore.currentGenreId }">
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
  
  .tv-list {
  display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding: 4vw;
    padding-bottom: 16vw;
    
  }
  
  .tv-card {
    width: 14rem;
    height: 35rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
    justify-content: center;
    margin-bottom: 3rem;
  }
  
  .tv-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000000;
  }
  
  .tv-details {
    padding: 0 1rem;
    background-color: #0000;
    border-radius: 20px;
  }
  
  .tv-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
    margin: 0 0 1rem 0;
  }

  .tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  margin-top: 1.3rem;
}

.tv-genres span {
  background-color: slateblue;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #a352ff;
  box-shadow: 0 0 0.5rem rgb(120, 107, 206);
}

.active {
  background-color: #ffffff;
  font-weight: bolder;
  color: #000;
}

.tv-genres span.active {
  background-color: #ffffff;
  color: #000;
  font-weight: bolder;
}
  </style>
