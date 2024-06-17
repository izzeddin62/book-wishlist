import axios from 'axios';
import { redirect } from 'react-router-dom';

const backend = axios.create({
  baseURL: `http://localhost:3000/api`
});

backend.interceptors.request.use(
  async config => {
    const token  = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

backend.interceptors.response.use(

    response => {
        return response;
    },
    error => {
        if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        redirect("/login");
        }
        return Promise.reject(error);
    }
    );

export default backend;
