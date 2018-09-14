import Vue from 'vue'
import Vuex from 'vuex'

import applyForShop from './components/applyForShop/store'


import goodsManagement from "./components/goodsManagement/goods";
import app from './components/app/store';
import userAccount from './components/userAccount/store';
import shopName from './components/shopName/store'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        applyForShop,
        goodsManagement,
        app,
        userAccount,
        shopName
    }
});
