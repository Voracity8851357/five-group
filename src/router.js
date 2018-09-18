import Vue from 'vue'
import Router from 'vue-router'

import Index from "./routes/index";
import store from './store.js';


import login from './components/app/login.vue';
import reg from './components/app/reg.vue';
import PetOwners from './components/petowners/pet';
import ServiceManage from './components/serviceManage/serviceManage.vue'
import ApplyForShop from './components/applyForShop/applyForShop.vue';
import ShopName from './components/shopName/shopName.vue'
import UserAccount from './components/userAccount/userAccount';
import GoodsContainer from "./components/goodsManagement/goodsContainer";
import orderManagement from './components/orderManagement/orderManagement';

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
            path: "/index",
            component: Index,
            children: [
                {
                    path: '/index/applyForShop',
                    component: ApplyForShop,
                },
                {
                    path: '/index/goodsName',
                    component: GoodsContainer,
                },
                {
                    path: '/index/serviceManage',
                    name: 'serviceManage',
                    component: ServiceManage,
                },
                {
                    path: '/index/orderManagement',
                    component: orderManagement,
                },
                {
                    path: '/index/userAccount',
                    component: UserAccount,
                },
                {
                    path: '/index/shopName',
                    component: ShopName,
                },
                {
                    path: '/index/petOwners',
                    component: PetOwners,
                },
            ]
        }
    ]
})
