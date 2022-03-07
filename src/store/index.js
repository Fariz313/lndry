import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		status: '',
		token: localStorage.getItem('Authorization') || '',
		user: {}
	},
	mutations: {
		auth_request(state) {
			state.status = 'loading'
		},
		auth_success(state, token) {
			state.status = 'success'
			state.token = token
		},
		userDetail(state, user){
			state.status = 'success'
			state.user = user
		},
		auth_error(state) {
			state.status = 'error'
		},
		logout(state) {
			state.status = ''
			state.token = ''
		},
	},
	actions: {
		login({ commit }, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({ url: '/login', data: user, method: 'POST' })
					.then(response => {
						const token = response.data.token;
						const logged = response.data.logged;
						localStorage.setItem('Authorization', token)
						axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('Authorization');
						commit('auth_success', token)
						axios.get("/login/check")
						.then(response => {
							commit('userDetail', response.data.user)
						})
						resolve(response)
					})
					.catch(err => {
						commit('auth_error')
						reject(err)
					})
			})
		},
		register({ commit }, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({ url: '/register', data: user, method: 'POST' })
					.then(response => {
						const token = response.data.token
						const logged = response.data.logged
						localStorage.setItem('Authorization', token)
						axios.defaults.headers.common['Authorization'] ="Bearer " + token
						commit('auth_success', token)
						resolve(response)
						axios.get("/login/check")
						.then(response => {
							commit('userDetail', response.data.user)
						})
						resolve(response)
					})
					.catch(err => {
						commit('auth_error', err)
						reject(err)
					})
			})
		},
		logout({ commit }) {
			return new Promise((resolve, reject) => {
				commit('logout')
				delete axios.defaults.headers.common['Authorization'];
				localStorage.removeItem('Authorization');
				resolve()
			})
		}
	},
	getters: {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
		userDetail: state => state.user,
	}
})