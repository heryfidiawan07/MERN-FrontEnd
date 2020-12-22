import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Button from '../../components/Button'
import UserCard from './UserCard'
import FormModal from './FormModal'

import {authenticated} from '../../store'
import {useRecoilValue} from 'recoil'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function Index() {
	const auth = useRecoilValue(authenticated)
	// console.log('User INDEX',auth)

	const headers = {headers: {Authorization: auth.check}}
	const [users, setUsers] = useState([])

	const getUsers = async () => {
		try{
			let res = await axios.get('/user', headers)
			setUsers(res.data.data)
			console.log(res.data.data)
		} catch (e) {
			console.log(e.message)
		}
	}

	const createHandler = async (data) => {
		axios.post('/user', data, headers)
		.then(async (res) => {
			await Swal.fire(
				'Saved !',
				'Your data has been saved',
				'success'
			)
			await setModal({show:false})
			await getUsers()
		}).catch(e => {
			console.log('e ',e)
			console.log('e.res ',e.response)
			console.log('e message ', e.message)
		})
	}

	const updateHandler = async (data, userId) => {
		await axios.put(`/user/${userId}`, data, headers)
		.then(async (res) => {
			await Swal.fire(
				'Saved !',
				'Your data has been updated',
				'success'
			)
			await setModal({show:false})
			await getUsers()
		}).catch(e => {
			console.log('e ',e)
			console.log('e.res ',e.response.data.data)
		})
	}

	const deleteHandler = async (userId) => {
		await axios.delete(`/user/${userId}`, headers)
		.then(async (res) => {
			await Swal.fire(
				'Saved !',
				'Your data has been deleted',
				'success'
			)
			await getUsers()
		}).catch(e => {
			console.log('e ',e)
			console.log('e.res ',e.response)
		})
	}

	const [modal, setModal] = useState([])
	const btnCreate = () => {
		setModal({
			title: 'Create User',
			handler: createHandler,
			userId: false,
			data: false,
			show: true,
		})
	}

	const getUser = async (userId) => {
		try{
			let res = await axios.get(`/user/${userId}`, headers)
			return res.data.data
		} catch (e) {
			console.log(e.message)
		}
	}

	const btnEdit = async (e) => {
		return setModal({
			title: 'Edit '+e.target.getAttribute('name'),
			handler: updateHandler,
			userId: e.target.getAttribute('userid'),
			data: await getUser(e.target.getAttribute('userid')),
			show: true,
		})
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<div className="row">
			<div className="col-12 mb-2">
				<Button title="Create User" className="btn btn-primary btn-sm" onClick={btnCreate}/>
				<FormModal
					show={modal.show}
					title={modal.title}
					userId={modal.userId}
					data={modal.data}
					onHide={() => setModal({show:false})}
					onSubmit={modal.handler}
				/>
			</div>
			{
				users.map((user, index) => {
					return (
						<div className="col-lg-4" key={index}>
							<UserCard
								id={user._id}
								photo={user.photo}
								name={user.name}
								email={user.email}
								btnEdit={
									<Button 
										className="btn btn-primary btn-sm mx-1" 
										onClick={btnEdit} 
										icon={<i className="fas fa-edit" 
										name={user.name} 
										userid={user._id}></i>} 
									/>
								}
								onDelete={deleteHandler}
							/>
						</div>
					)
				})
			}
		</div>
	)
}

export default Index