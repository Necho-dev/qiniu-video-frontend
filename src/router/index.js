import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout/Main.vue'
import Recommend from '@/views/Recommend.vue'
import Class from '@/views/Class.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: Recommend
            },
            {
                path: '/class',
                component: Class
            }
        ]
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
