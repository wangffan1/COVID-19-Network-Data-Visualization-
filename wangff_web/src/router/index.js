import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '../views/index.vue'

const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        children: [{
            path: '/',
            name: '/Epidemic_distribution',
            redirect: '/Epidemic_distribution',
            component: () => 
                import('../views/main.vue'),       
            children: [
                {
                path: '/',
                name: '/Epidemic_distribution',
                component: () => 
                    import('../views/Epidemic_distribution/index.vue')
                },
                {
                path: '/',
                name: '/Provinces',
                component: () => 
                    import('../views/Provinces/index.vue')
                },
                {
                path: '/',
                name: '/Vaccine_administration',
                component: () => 
                    import('../views/Vaccine_administration/index.vue')
                },
                {
                path: '/',
                name: '/National_policies',
                component: () => 
                    import('../views/National_policies/index.vue')
                }
            ] 
        }]
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
