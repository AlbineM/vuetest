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

app.mount('#app')
