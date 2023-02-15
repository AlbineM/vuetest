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
    },
    {
      path: '/restaurant/:restaurantalias',
      name: 'restaurant-details',
      component: () => import('../views/RestaurantDetails.vue'),
    },
    {
      path: '/internal-error/',
      name: 'internal-error',
      component: () => import('../views/500.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404.vue'),
    },

  ],
  linkActiveClass: 'bg-gray-900 text-white block'
})

export default router
