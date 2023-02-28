import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '../views/index.vue'

const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
