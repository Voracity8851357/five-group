import Vue from 'vue'

import router from './router'
import App from './App.vue'
import userAccount from './components/userAccount/userAccount.vue';


import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.component('userAccount', userAccount);


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
