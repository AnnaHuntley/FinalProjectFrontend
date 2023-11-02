// apiConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your Rails backend URL
});

export default instance;
