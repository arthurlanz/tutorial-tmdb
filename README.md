# Tutorial TMDB

Aplicação de estudo em **Vue 3** que consome a API do [TMDB](https://www.themoviedb.org/) para listar filmes e séries por gênero e mostrar os detalhes de cada título.

## Telas

- **Home**
- **Filmes**: lista de filmes por gênero
- **Séries**: lista de séries por gênero
- **Detalhes** do filme ou da série

## Tecnologias

- Vue 3 + Vite
- Vue Router
- Pinia
- Axios
- vue-loading-overlay

## Como rodar

```bash
git clone https://github.com/arthurlanz/tutorial-tmdb.git
cd tutorial-tmdb
npm install
npm run dev
```

É preciso ter uma chave de API do TMDB configurada no projeto (veja `src/plugins/`).
