import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './global/store'

Vue.config.productionTip = false

Vue.directive("uppercase", {
  update(el) {
    el.value = el.value.toUpperCase();
  },
});

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')