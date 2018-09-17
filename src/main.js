import Vue from 'vue'

import router from './router'
import App from './App.vue'
import userAccount from './components/userAccount/userAccount.vue';
import petOwners from './components/petowners/pet';


import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Petg from '../src/components/petowners/petg'
Vue.use(ElementUI);
Vue.component("Petg", Petg);
Vue.component('userAccount', userAccount);
Vue.component('petOwners',petOwners );


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
