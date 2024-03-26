import Vue from "vue"
import Vuex from "vuex"

import tages from "./modules/tages.js"
import user from "./modules/user.js"

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		tages,
		user
	}
})