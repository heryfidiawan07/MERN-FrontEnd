import {atom, selector} from 'recoil'
import axios from 'axios'

const headers = {headers: {Authorization: localStorage.getItem('auth-token')}}

const auth = selector({
	key: 'auth',
	get: async () => {
		let auth = null
		try{
			let res = await axios.get(`http://localhost:4000/user/${localStorage.getItem('auth-id')}`, headers)
			auth = {user: res.data.data}
		} catch (e) {
			localStorage.clear()
			auth = {user: e.message}
		}
		return auth
	}
})

const authenticated = atom({
	key: 'authenticated',
	default: {
		// check: false,
		check: localStorage.getItem('auth-token'),
		user: {
			id: localStorage.getItem('auth-id'),
			name: localStorage.getItem('auth-name'),
			email: localStorage.getItem('auth-email'),
			token: localStorage.getItem('auth-token')
		}
	}
})

const theme = atom({
	key: 'switch-theme',
	default: 'success'
})

const Authorization = atom({
	key: 'headers',
	default: localStorage.getItem('auth-token')
})

const backend_url = atom({
	key: 'backend_url',
	default: 'http://localhost:4000'
})

export {authenticated, Authorization, theme, backend_url}