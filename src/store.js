import Vue from 'vue'
import Vuex from 'vuex'
import store from '../src/components/petowners/store'    //引入自己的store


import goodsManagement from "./components/goodsManagement/store";
import serviceManage from './components/serviceManage/store'
import applyForShop from './components/applyForShop/store'
import app from './components/app/store';
import userAccount from './components/userAccount/store';
import orderManagement from './components/orderManagement/store'
import shopName from './components/shopName/store'

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        store,
        goodsManagement,
        app,
        userAccount,
        orderManagement,
        serviceManage,
        shopName,
        applyForShop,
    }
});
