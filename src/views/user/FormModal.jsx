import React, {useState, useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap'

import {useRecoilValue} from 'recoil'
import noimage from '../../noimage.jpg'
import {backend_url} from '../../store'

function FormModal(props) {
	const url = useRecoilValue(backend_url)

	const [photo, setPhoto] = useState('')
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [address, setAddress] = useState('')

	const identifier = props.data

	const setData = () => {
		if (identifier) {
			setName(props.data.name)
			setUsername(props.data.username)
			setEmail(props.data.email)
			setAddress(props.data.address)
		}
	}

	useEffect(() => {
		setData()
	}, [identifier])

	const submitHandler = (e) => {
		e.preventDefault()

		let data = new FormData()
		data.append('photo',photo)
		data.append('name',name)
		data.append('username',username)
		data.append('email',email)
		data.append('password',password)
		data.append('address',address)
		
		try{
			props.onSubmit(data, props.userId)
			setPhoto('')
			setName('')
			setUsername('')
			setEmail('')
			setPassword('')
			setAddress('')
		}catch(e){
			console.log('err',e)
			console.log('err response',e.response)
		}
	}

	return (
		<Modal {...props}>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
				<Modal.Body>
					<div className="form-group mb-2">
						<label className="d-block">Photo</label>
						<input type="file" required onChange={(e) => setPhoto(e.target.files[0])} />
						<img src={props.data ? url+'/'+props.data.photo : noimage} alt="img" width="100" onChange={(e) => setPhoto(e.target.files[0])} />
					</div>
					<div className="form-group mb-2">
						<label>Name</label>
						<input type="text" name="name" className="form-control form-control-sm" required 
							value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="form-group mb-2">
						<label>Username</label>
						<input type="text" name="username" className="form-control form-control-sm" required 
							value={username} onChange={(e) => setUsername(e.target.value)} />
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
					<div className="form-group mb-2">
						<label>Address</label>
						<input type="text" name="address" className="form-control form-control-sm" required
							value={address} onChange={(e) => setAddress(e.target.value)} />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn btn-secondary btn-sm" onClick={props.onHide}>
						Close
					</Button>
					<Button type="submit" onClick={submitHandler} className="btn btn-primary btn-sm">
						Save Changes
					</Button>
				</Modal.Footer>
		</Modal>
	)
}

export default FormModal
