<script setup>
  import { defineProps, onMounted } from 'vue';
  import { useTvStore } from '@/stores/tv';
  const tvStore = useTvStore();

  const props = defineProps({
    tvId: {
      type: Number,
      required: true,
    },
  });

  onMounted(async () => {
    await tvStore.getTvDetail(props.tvId);
  });

  // Funções para formatar
  const formatBudget = (value) => {
    if (!value) return 'Não informado';
    return `$${value.toLocaleString('en-US')}`;
  };

  const formatVote = (value) => {
    if (!value) return 'N/A';
    return `${value.toFixed(1)} / 10`;
  };
</script>

<template>
  <div v-if="tvStore.currentTv">
    <div
      class="details-backdrop"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tvStore.currentTv.backdrop_path})`,
      }"
    >
      <div class="backdrop-overlay"></div>
      <div class="main-content">
        <div class="poster">
          <img
            :src="`https://image.tmdb.org/t/p/w342${tvStore.currentTv.poster_path}`"
            :alt="tvStore.currentTv.name"
          />
        </div>
        <div class="details">
          <h1>{{ tvStore.currentTv.name }}</h1>
          <p class="tagline">{{ tvStore.currentTv.tagline }}</p>
          <h3>Sinopse</h3>
          <p class="overview">{{ tvStore.currentTv.overview }}</p>
          <div class="info">
            <p v-if="tvStore.currentTv.budget">
              <strong>Orçamento:</strong>
              {{ formatBudget(tvStore.currentTv.budget) }}
            </p>
            <p>
              <strong>Avaliação:</strong>
              {{ formatVote(tvStore.currentTv.vote_average) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="production-companies">
      <h2>Produtoras</h2>
      <div class="company-list">
        <div
          v-for="company in tvStore.currentTv.production_companies"
          :key="company.id"
          class="company-card"
        >
          <img
            v-if="company.logo_path"
            :src="`https://image.tmdb.org/t/p/w185${company.logo_path}`"
            :alt="company.name"
          />
          <p v-else>{{ company.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.details-backdrop {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  margin: -2rem -4vw;
  margin-bottom: 2rem;
}

.backdrop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1;
}

.main-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vw;
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.poster img {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.details {
  flex: 1;
}

.details h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.tagline {
  font-style: italic;
  color: var(--text-muted, #aaa);
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.details h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color, slateblue);
  padding-bottom: 0.5rem;
  display: inline-block;
}

.overview {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color, #e0e0e0);
}

.info {
  margin-top: 2rem;
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.info p {
  font-size: 1.1rem;
}

.info p strong {
  color: var(--text-muted, #aaa);
  font-weight: 500;
}

.production-companies {
  padding: 2rem 0;
  background-color: #181818;
  margin: 0 -4vw;
}

.production-companies h2 {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
}

.company-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 0 4vw;
}

.company-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  min-height: 100px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.company-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.company-card img {
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
}

.company-card p {
  color: #000;
  font-weight: 600;
  text-align: center;
}

@media (min-width: 768px) {
  .main-content {
    flex-direction: row;
    align-items: flex-start;
  }
}
</style>
