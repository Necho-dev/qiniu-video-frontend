import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout/Main.vue'
import Recommend from '@/views/Recommend.vue'
import Video from '@/views/Video.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Recommend
            }
        ]
    },
    {
        path: '/:id',
        name: 'Work',
        component: Video,
        meta: {transition: 'slide-right'}
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
