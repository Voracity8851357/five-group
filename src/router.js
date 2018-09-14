import Vue from 'vue'
import Router from 'vue-router'

import IndexPlatform from "./routes/index-platform";
import IndexStore from "./routes/index-store";
import store from './store.js';
import login from './components/app/login.vue';
import reg from './components/app/reg.vue';
<<<<<<< HEAD
import petOwners from './components/petowners/pet';
=======
import UserAccount from './components/userAccount/userAccount';

import GoodsContainer from "./components/goodsManagement/goodsContainer";

>>>>>>> 597f7460db875b7ae832bdcde02ba3ac68429ba0
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
<<<<<<< HEAD
                    path: '/index/petOwners',
                    component: petOwners,
                },
                {
=======
>>>>>>> 597f7460db875b7ae832bdcde02ba3ac68429ba0
                    path: '/index/orderManagement',
                    // component: OrderManagement,
                },
            ]
        }
    ]
})
