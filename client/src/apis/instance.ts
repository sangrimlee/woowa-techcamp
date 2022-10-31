import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 2500,
});

export default instance;
