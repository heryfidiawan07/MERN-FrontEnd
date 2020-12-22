import {atom, selector} from 'recoil'
import axios from 'axios'

const authenticated = atom({
	key: 'authenticated',
	default: {
		check: localStorage.getItem('auth-token'),
		user: {
			id: localStorage.getItem('auth-id'),
			name: localStorage.getItem('auth-name'),
			email: localStorage.getItem('auth-email'),
			token: localStorage.getItem('auth-token')
		}
	}
})

// const authUser = selector({
// 	key: 'auth-user',
// 	// get: ({get}) => get(authenticated),
// 	get: async () => {
// 		let data = null
// 		try{
// 			let res = await axios.get(`http://localhost:4000/user/${localStorage.getItem('auth-id')}`, headers)
// 			data = {user: res.data.data}
// 		} catch (e) {
// 			data = {user: false}
// 		}
// 		return data
// 	}
// })

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