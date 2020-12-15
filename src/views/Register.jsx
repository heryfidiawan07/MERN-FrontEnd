import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {theme} from '../store'
import {useRecoilState} from 'recoil'

function Register() {
	const history = useHistory()

	const [currentTheme, setCurrentTheme] = useRecoilState(theme)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = async (e) => {
		e.preventDefault()

		let data = ({
			name: name,
			email: email,
			password: password
		})
		// console.log(data)
		await axios.post('/auth/register', data)
		.then(res => {
			setCurrentTheme('success')
			history.push('/login')

			setName('')
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
					<h5 className="col-12">Register</h5>
					<form onSubmit={submitHandler} className="col-12">
						<div className="form-group mb-2">
							<label>Name</label>
							<input type="text" name="name" className="form-control form-control-sm" required 
								value={name} onChange={(e) => setName(e.target.value)} />
						</div>
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
							<button type="submit" className="btn btn-success btn-sm btn-block">Register</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register