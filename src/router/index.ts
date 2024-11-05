import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import AboutUs from '../views/AboutUS.vue'
import ContactUs from '../views/ContactUs.vue'
import Guests from '../views/cosplayGuests.vue'
import Photograhers from '../views/Photograhers.vue'
import Vendors from '../views/vendor.vue'
import Gallery from '../views/gallery.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home // Home
    },
    {
      path: '/about',
      name: 'About Us',
      component: AboutUs //AboutUs
    },
    {
      path: '/guests',
      name: 'Guest',
      component: Guests // CosplayGuests
    },
    {
      path: '/vendors',
      name: 'Vendor',
      component: Vendors
    },
    {
      path: '/contact-us',
      name: 'Contact Us',
      component: ContactUs // ContactUs
    },
    {
      path: '/photographers',
      name: 'Photographers',
      component: Photograhers // Photographers
    },
    {
      path: '/gallerys',
      name: 'Gallerys',
      component: Gallery// Photographers
    }
  ]
})

export default router
