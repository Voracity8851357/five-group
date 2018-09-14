import Vue from 'vue'
import Router from 'vue-router'

import IndexPlatform from "./routes/index-platform";
import IndexStore from "./routes/index-store";
import store from './store.js';
import login from './components/app/login.vue';
import reg from './components/app/reg.vue';
import UserAccount from './components/userAccount/userAccount';

import GoodsContainer from "./components/goodsManagement/goodsContainer";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/reg',
            name: 'reg',
            component: reg
        },
        {
            path: "/indexPlatform",
            component: IndexPlatform,
            children: [
                {
                    path: '/index/userAccount',
                    component: UserAccount,
                },
                {
                    path: '/index/shopName',
                    // component: ShopName,
                },
                {
                    path: '/index/petOwners',
                    // component: PetOwners,
                },
            ]
        },
        {
            path: "/indexStore",
            component: IndexStore,
            children: [
                {
                    path: '/index/applyForShop',
                    // component: ApplyForShop,
                },
                {
                    path: '/index/goodsName',
                    component: GoodsContainer,
                },
                {
                    path: '/index/serviceName',
                    // component: ServiceName,
                },
                {
                    path: '/index/orderManagement',
                    // component: OrderManagement,
                },
            ]
        }
    ]
})
