<script setup>
  import { ref, onMounted } from 'vue';
  import api from './plugins/axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);

  onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    moviesGenres.value = response.data.genres;
    response = await api.get('genre/tv/list?language=pt-BR');
    TVGenres.value = response.data.genres;
  });
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #111;
  color: #fff;
  padding-left: 3vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid var(--border-color, #333);
}

nav {
  column-gap: 2.5rem;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: var(--text-muted, #aaa);
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
  position: relative;
  padding-bottom: 4px;
}
nav a:hover {
  color: var(--text-color, #fff);
}

nav a.router-link-exact-active {
  color: #fff;
  font-weight: 600;
}
nav a.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-gradient, linear-gradient(to right, #8e2de2, #4a00e0));
}

main {
  padding: 2rem 4vw;
}
</style>