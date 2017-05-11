export default {
	state:{
		loadFlag: false
	},
	mutations:{
		changeLoadFlag (state,flag) {
			state.loadFlag=flag
		}
	},
	actions:{
		loding ({commit},flag) {
			commit("changeLoadFlag",flag)
		}
	}
}