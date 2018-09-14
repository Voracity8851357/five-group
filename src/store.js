import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD
import serviceManage from './components/serviceManage/store'
=======

import applyForShop from './components/applyForShop/store'
>>>>>>> da13aaa8d113819aa7102f061907478b9d228d21


import goodsManagement from "./components/goodsManagement/goods";
import app from './components/app/store';
import userAccount from './components/userAccount/store';
import shopName from './components/shopName/store'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
<<<<<<< HEAD
        serviceManage
=======
        applyForShop,

        goodsManagement,
        app,
        userAccount,
        shopName
>>>>>>> da13aaa8d113819aa7102f061907478b9d228d21
    }
});
