import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/restaurants-list',
      name: 'restaurants',
      component: () => import('../views/RestaurantsList.vue'),
      children : [
      ]
    },
    {
      path: '/restaurant/:restaurantalias',
      name: 'restaurant-details',
      component: () => import('../views/RestaurantDetails.vue'),
    }
  ],
  linkActiveClass: 'bg-gray-900 text-white block'
})

export default router
