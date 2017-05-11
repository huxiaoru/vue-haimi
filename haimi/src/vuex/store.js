import Vue from "vue";
import Vuex from "vuex";
import loding from "./module/loding/index";
import shopCar from "./module/shopCar/index"
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		loding,
		shopCar
	}
})