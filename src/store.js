import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD
import store from '../src/components/petowners/store'    //引入自己的store
=======

import goodsManagement from "./components/goodsManagement/goods";
import app from './components/app/store';
import userAccount from './components/userAccount/store';

>>>>>>> 597f7460db875b7ae832bdcde02ba3ac68429ba0
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
<<<<<<< HEAD
        store
=======
        goodsManagement,
        app,
        userAccount
>>>>>>> 597f7460db875b7ae832bdcde02ba3ac68429ba0
    }
});
