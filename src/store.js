import Vue from 'vue'
import Vuex from 'vuex'
import applyForShop from './components/applyForShop/store'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        applyForShop
    }
});
