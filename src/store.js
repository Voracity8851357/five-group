import Vue from 'vue'
import Vuex from 'vuex'
import serviceManage from './components/serviceManage/store'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        serviceManage
    }
});
