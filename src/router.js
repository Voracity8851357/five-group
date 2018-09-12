import Vue from 'vue'
import Router from 'vue-router'

import Index from "./routes/index";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/index",
            component: Index,
            children: [
                {
                    path: '/index/userAccount',
                    // component: UserAccount,
                },
                {
                    path: '/index/shopName',
                    // component: ShopName,
                },
                {
                    path: '/index/applyForShop',
                    // component: ApplyForShop,
                },
                {
                    path: '/index/goodsName',
                    // component: GoodsName,
                },
                {
                    path: '/index/serviceName',
                    // component: ServiceName,
                },
                {
                    path: '/index/petOwners',
                    // component: PetOwners,
                },
                {
                    path: '/index/orderManagement',
                    // component: OrderManagement,
                },
            ]
        }
    ]
})
