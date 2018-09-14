import Vue from 'vue'
import Vuex from 'vuex'
import store from '../src/components/petowners/store'    //引入自己的store
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        store
    }
});
