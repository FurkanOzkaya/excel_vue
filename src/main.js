import Vue from 'vue'
import App from './App.vue'
import vue_resoruce from 'vue-resource'

Vue.use(vue_resoruce);
Vue.config.productionTip = false
import JsonEditor from 'vue-json-edit'
  
Vue.use(JsonEditor)
new Vue({
  render: h => h(App),
}).$mount('#app')
