import Vue from 'vue'

import router from './router'
import App from './App.vue'


import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Petg from '../src/components/petowners/petg'
Vue.use(ElementUI);
Vue.component("Petg", Petg);


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
