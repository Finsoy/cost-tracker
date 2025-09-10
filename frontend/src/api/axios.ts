import axios from 'axios';
import { API_URL } from './constants';

const api = axios.create({
  baseURL: API_URL || 'http://localhost:4000',
  withCredentials: true,
});

export default api;
