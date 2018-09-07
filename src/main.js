// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import './assets/iconfont/iconfont.css'
import './styles/index.scss'

// import axios from 'axios'
// 引入mockjs
import './mock'
import './permission'
/* // axios是不能再其他组件中使用的，所以将其改为vue原型属性
Vue.prototype.$http = axios */

Vue.use(ElementUI, { size: 'medium', zIndex: 3000 })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
