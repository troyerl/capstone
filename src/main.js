import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store';

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyByS7JeV1zck2kSDNLCNqq33VFNz2WuHlA',
  }
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
