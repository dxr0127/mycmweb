// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import 'normalize.css/normalize.css'
import echarts from 'echarts'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {myGetAjax, myPostajax, share} from './sevice/index'

Vue.use(VueAwesomeSwiper)
Vue.prototype.$echarts = echarts
Vue.prototype.$get = myGetAjax // get请求
Vue.prototype.$post = myPostajax // get请求
Vue.prototype.$share = share // 分享

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  next()
})
// 百度统计
router.afterEach((to, from, next) => {
  setTimeout(() => {
    var _hmt = _hmt || []
    window._hmt = _hmt;
    (function () {
      // 每次执行前，先移除上次插入的代码
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?096559b7af89d224025872875937aba7'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 50)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
