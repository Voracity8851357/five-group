import Vue from 'vue'

import router from './router'
import App from './App.vue'
import userAccount from './components/userAccount/userAccount.vue';


import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Petg from '../src/components/petowners/petg'
Vue.use(ElementUI);
<<<<<<< HEAD
Vue.component("Petg", Petg);
=======
Vue.component('userAccount', userAccount);
>>>>>>> 597f7460db875b7ae832bdcde02ba3ac68429ba0


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
