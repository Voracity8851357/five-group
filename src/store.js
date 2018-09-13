import Vue from 'vue'
import Vuex from 'vuex'
import app from './components/app/store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app
    }
});
