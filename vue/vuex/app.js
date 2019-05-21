import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store/index'

Vue.filter('currency', function (value) {
  return '$' + value.toFixed(2)
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
