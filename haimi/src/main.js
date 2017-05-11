// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./vuex/store"
import vueResource from "vue-resource"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from "vue-lazyload"

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload,{
  loading: 'static/img/timg2.gif',
  try: 3
})

Vue.directive("touchmove",{
  update (ele) {
    let top=ele.offsetTop;
    window.onscroll=()=>{
      let scrollTop=document.body.scrollTop;
      if(scrollTop>=top){
        ele.style.position="fixed";
      }else{
        ele.style.position="static";
      }
    }
    document.addEventListener("touchmove",()=>{
      let scrollTop=document.body.scrollTop;
      if(scrollTop>=top){
        ele.style.position="fixed";
      }else{
        ele.style.position="static";
      }
    },false)
  }
})


Vue.http.interceptors.push((request, next) => {
		store.dispatch("loding",true)
	next((response) => {
		store.dispatch("loding",false)
	})
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    this.$store.dispatch("setShopCar")
  }
})