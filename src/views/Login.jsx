import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {authenticated, theme} from '../store'
import {useRecoilState} from 'recoil'

function Login() {
	const history = useHistory()

	const [auth, setAuth] = useRecoilState(authenticated)
	const [currentTheme, setCurrentTheme] = useRecoilState(theme)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = async (e) => {
		e.preventDefault()

		let data = ({
			email: email,
			password: password
		})
		// console.log(data)
		await axios.post('/auth/login', data)
		.then(res => {
			localStorage.setItem('auth-token', res.data.data.Authorization)
			localStorage.setItem('auth-id', res.data.user._id)
			localStorage.setItem('auth-name', res.data.user.name)
			localStorage.setItem('auth-email', res.data.user.email)
			
			setCurrentTheme('success')

			setAuth({
				check: true,
				// check: localStorage.getItem('auth-token'),
				user: {
					id: localStorage.getItem('auth-id'),
					name: localStorage.getItem('auth-name'),
					email: localStorage.getItem('auth-email'),
					token: localStorage.getItem('auth-token'),
				},
			})

			history.push('/dashboard')

			setEmail('')
			setPassword('')
		})
		.catch(err => {
			setCurrentTheme('danger')
			console.log('err',err)
			console.log('err response',err.response)
		})
	}

	return (
		<div className="row vh-100 vw-100">
			<div className={`col-md-7 bg-${currentTheme}`}></div>
			<div className="col-md-5 justify-content-center d-flex align-items-center">
				<div className="row">
					<h5 className="col-12">Login</h5>
					<form onSubmit={submitHandler} className="col-12">
						<div className="form-group mb-2">
							<label>Email</label>
							<input type="email" name="email" className="form-control form-control-sm" required 
								value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="form-group mb-2">
							<label>Password</label>
							<input type="password" name="password" className="form-control form-control-sm" required
								value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-success btn-sm btn-block">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login