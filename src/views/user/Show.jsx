import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import {useParams} from 'react-router-dom'

function Show() {
	const [user, setUser] = useState([])
	let {identifier} = useParams()

	const getUser = async () => {
		try{
			let res = await axios.get(`/user/${identifier}`, {headers: {Authorization: localStorage.getItem('auth-token')}})
			setUser(res.data.data)
			console.log(res.data.data)
		} catch (e) {
			console.log(e.message)
		}
	}

	useEffect(() => {
		getUser()
	}, [identifier])

	return (
		<div className="row">
			<div className="col-12">
				<UserCard
					photo={user.photo}
					name={user.name}
					email={user.email}
					username={user.username}
					address={user.address}
				/>
			</div>
		</div>
	)
}

export default Show