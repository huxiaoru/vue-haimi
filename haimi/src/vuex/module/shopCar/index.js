export default {
	state: {
		shopCar:[]
	},
	mutations: {
		addPro (state,obj) {
			if(obj)state.shopCar.unshift(obj);
			localStorage["shopCar"]=JSON.stringify(state.shopCar)
		},
		setShopCar (state) {
			if(localStorage["shopCar"]){
				state.shopCar=JSON.parse(localStorage["shopCar"])
			}
		}
	},
	actions:{
		setShopCar ({commit}){
			commit("setShopCar")
		},
		addPro ({commit},obj){
			commit("addPro",obj)
		}
	}
}