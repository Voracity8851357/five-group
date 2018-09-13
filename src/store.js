import Vue from 'vue'
import Vuex from 'vuex'

import goodsManagement from "./components/goodsManagement/goods";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        goodsManagement,
    }
});
