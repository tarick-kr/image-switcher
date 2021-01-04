import Vue from 'vue'
import _ from 'lodash';
import App from './App.vue'

Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
