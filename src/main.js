import Vue from 'vue'
import App from './App.vue'
import router from './router'


import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyDj-LLhaswp5YGnQX6i4AHSSIZAnaeH_0c",
  authDomain: "soccer-a8831.firebaseapp.com",
  databaseURL: "https://soccer-a8831.firebaseio.com",
  projectId: "soccer-a8831",
  storageBucket: "soccer-a8831.appspot.com",
  messagingSenderId: "474608749779"
};
firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
