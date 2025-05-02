import axios from 'axios';

// Create an axios instance with the correct base URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // or just http://127.0.0.1:8000 if no /api prefix
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;

