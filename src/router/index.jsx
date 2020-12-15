import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Dashboard from '../views/Dashboard'
import Home from '../views/Home'
import UserIndex from '../views/user/Index'
import UserShow from '../views/user/Show'
import Login from '../views/Login'
import Register from '../views/Register'
import NotFound from '../views/NotFound'
import * as Middleware from '../middleware/App'

function Router() {
	return (
		<Switch>
			<Route exact path="/">
				<Middleware.Authenticated>
					<Navbar> <Home/> </Navbar>
				</Middleware.Authenticated>
			</Route>
			<Route exact path="/user">
				<Middleware.Authenticated>
					<Navbar> <UserIndex/> </Navbar>
				</Middleware.Authenticated>
			</Route>
			<Route exact path="/dashboard">
				<Middleware.Authenticated>
					<Navbar> <Dashboard/> </Navbar>
				</Middleware.Authenticated>
			</Route>
			<Route path="/user/:identifier">
				<Middleware.Authenticated>
					<Navbar> <UserShow/> </Navbar>
				</Middleware.Authenticated>
			</Route>
			<Route path="/login">
				<Middleware.Guest render={<Login/>}/>
			</Route>
			<Route path="/register">
				<Middleware.Guest render={<Register/>}/>
			</Route>
			<Route path="*" component={NotFound}/>
		</Switch>
	)
}

export default Router