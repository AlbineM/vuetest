import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)

app.use(router)

const yelpApiKey = import.meta.env.VITE_YELP_API_KEY

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
  }
})
app.use(VueAxios, { axios: axiosInstance })
app.provide('axios', app.config.globalProperties.axios)
// providing 'axios'
// In your Views, inject axios like this:
/*
import { inject } from 'vue'
const axios = inject('axios')
*/
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
  );

  // response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorMessage = error.response.data.message || error.message;

      switch (error.response.status) {
        case 400:
        // bad request
        console.error('Bad request:', errorMessage);
        break;
        case 401:
        // unauthorized
        console.error('Unauthorized:', errorMessage);
        break;
        case 404:
        // not found
        console.error('Resource not found:', errorMessage);
        router.push({name: 'not-found'})
        break;
        case 500:
        // internal server error
        console.error('Internal server error:', errorMessage);
        router.push({name: 'internal-error'})
        break;
        default:
        console.error('An error occurred:', errorMessage);
      }
      return Promise.reject(error);
    }
    );

    app.mount('#app')
