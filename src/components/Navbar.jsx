import React from 'react'
import {useHistory, NavLink} from 'react-router-dom'
import {authenticated, theme} from '../store'
import {useRecoilState} from 'recoil'

function Navbar({children}) {
	const history = useHistory()

	const [currentTheme, setCurrentTheme] = useRecoilState(theme)
	const [auth, setAuth] = useRecoilState(authenticated)

	const logoutHandler = (e) => {
		e.preventDefault()
		localStorage.clear()
		setAuth({
			check: false,
			user: false,
		})
		history.push('/login')
	}

	return (
		<div>
			<nav className={`navbar navbar-expand-md navbar-dark bg-${currentTheme}`}>
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/">REACT</NavLink>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mb-2 mb-md-0">
							<li className="nav-item">
								<NavLink exact className="nav-link" to="/">Home</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/user">User</NavLink>
							</li>
							<li className="nav-item">
								{ 
									auth.check &&
									<NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
								}
							</li>
						</ul>
						<select value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)} className="form-control form-control-sm w-25 mr-auto">
							<option className="text-success" value="success">Navbar Success</option>
							<option className="text-danger" value="danger">Navbar Danger</option>
							<option className="text-primary" value="primary">Navbar Primary</option>
						</select>
						{
							auth.check ?
								<ul className="navbar-nav mb-2 mb-md-0">
									<li className="nav-item">
										<NavLink className="nav-link" to="">{auth.user.name}</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" to="" onClick={logoutHandler}>Logout</NavLink>
									</li>
								</ul>
							:
							<ul className="navbar-nav d-flex">
								<li className="nav-item">
									<NavLink exact className="nav-link" to="/login">Login</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/register">Register</NavLink>
								</li>
							</ul>
						}
					</div>
				</div>
			</nav>

			<div className="container pt-4">
				{children}
			</div>
		</div>
	)
}

export default Navbar