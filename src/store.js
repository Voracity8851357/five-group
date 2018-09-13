import Vue from 'vue'
import Vuex from 'vuex'

import goodsManagement from "./components/goodsManagement/goods";
import app from './components/app/store';
import userAccount from './components/userAccount/store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        goodsManagement,
        app,
        userAccount
    }
});
