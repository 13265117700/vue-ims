import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ViewUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
