import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../screens/Home.screen.vue')
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../screens/Checkout.screen.vue')
    },
    {
        path: '/details/:id',
        name: 'Details',
        component: () => import('../screens/Details.screen.vue')
    },
    {
        path: '/comics-by-hero/:id',
        name: 'ComicsByHero',
        component: () => import('../screens/ComicsByHero.screen.vue')
    },
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
})

export default router
