import Vue from 'vue'
import Router from 'vue-router'

import store from './store.js';
import login from './components/app/login.vue';
import reg from './components/app/reg.vue';
import info from './components/app/info.vue';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/reg',
            name: 'reg',
            component: reg
        },
        {
            path: '/info',
            name: 'info',
            component: info
        }
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})
