import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWE0NDYwNzA0Y2U5ZWZmOGQ2NTMyODQyN2RiMmE5ZiIsIm5iZiI6MTc1OTI1MjU3MS4wNjA5OTk5LCJzdWIiOiI2OGRjMTA1YjFkZDNhYzFjMzViYjE2OTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.b9z-qFuzgU3ZDMO5PmPiMsLY03XNswz1cTC4kk3_JRc`,
  },
});

export default api;