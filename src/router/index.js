import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout/Main.vue'
import Player from '@/views/Player.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: Player
            },

        ],
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
