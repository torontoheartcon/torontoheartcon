import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import AboutUs from '../views/AboutUS.vue'
import ContactUs from '../views/ContactUs.vue'
import CosplayGuests from '../views/cosplayGuests.vue'
import Photograhers from '../views/Photograhers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/home.vue') // Home
    },
    {
      path: '/about',
      name: 'About Us',
      component: () => import('../views/AboutUS.vue') //AboutUs
    },
    {
      path: '/guests',
      name: 'Guest',
      component: () => import('../views/cosplayGuests.vue') // CosplayGuests
    },
    {
      path: '/vendors',
      name: 'Vendor',
      component: () => import('../views/vendor.vue') // CosplayGuests
    },
    {
      path: '/contact-us',
      name: 'Contact Us',
      component: () => import('../views/ContactUs.vue') // ContactUs
    },
    {
      path: '/photographers',
      name: 'Photographers',
      component: () => import('../views/Photograhers.vue') // Photographers
    }
  ]
})

export default router
