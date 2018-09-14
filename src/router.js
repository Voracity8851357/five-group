import Vue from 'vue'
import Router from 'vue-router'

import IndexPlatform from "./routes/index-platform";
import IndexStore from "./routes/index-store";
import store from './store.js';
import login from './components/app/login.vue';
import reg from './components/app/reg.vue';

import ServiceManage from './components/serviceManage/serviceManage.vue'

import ApplyForShop from './components/applyForShop/applyForShop.vue';
import ShopName from './components/shopName/shopName.vue'
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
                    path: '/indexPlatform/userAccount',
                    component: UserAccount,
                },
                {
                    path: '/indexPlatform/shopName',
                    component: ShopName,
                },
                {
                    path: '/indexPlatform/petOwners',
                    // component: PetOwners,
                },
            ]
        },
        {
            path: "/indexStore",
            component: IndexStore,
            children: [
                {
                    path: '/indexStore/applyForShop',
                    component: ApplyForShop,
                },
                {
                    path: '/indexStore/goodsName',
                    component: GoodsContainer,
                },
                {
                    path: '/indexStore/serviceManage',
                    name:'serviceManage',
                    component: ServiceManage,
                },
                {
                    path: '/indexStore/orderManagement',
                    // component: OrderManagement,
                },
            ]
        }
    ]
})
