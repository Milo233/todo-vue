import Vue from 'vue'
import App from './App.vue'
// 引入router
import router from './router';
import './plugins/element.js'

Vue.config.productionTip = false

// 日期格式化
Vue.use(require('vue-moment'));

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

