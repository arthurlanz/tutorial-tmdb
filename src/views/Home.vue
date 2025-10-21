<template>
  <div class="home-container">
    <h1>Tutorial TMDB</h1>
    <p>Explore os filmes e programas de TV mais populares.</p>
    <div class="links">
      <router-link to="/filmes" class="home-link">Ver Filmes</router-link>
      <router-link to="/tv" class="home-link">Ver Programas de TV</router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 70vh; 
  color: var(--text-color, #f0f0f0);
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  color: var(--text-muted, #aaa);
  margin-bottom: 2.5rem;
}

.links {
  display: flex;
  gap: 2rem;
}

.home-link {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: var(--primary-gradient, linear-gradient(to right, #8e2de2, #4a00e0));
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.home-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(142, 45, 226, 0.4);
}
</style>