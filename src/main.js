// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
Vue.use(AlloyFingerVue, {
  AlloyFinger
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
