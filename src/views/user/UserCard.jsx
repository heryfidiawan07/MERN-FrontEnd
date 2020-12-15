import React from 'react'
import {useRecoilValue} from 'recoil'
import {NavLink} from 'react-router-dom'

import noimage from '../../noimage.jpg'
import {backend_url} from '../../store'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function UserCard(props) {
	const url = useRecoilValue(backend_url)

	const swallDelete = (e) => {
		// console.log(e.target.id)
		Swal.fire({
			title: `Are you sure ? ${e.target.getAttribute('name')}`,
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			// console.log(result)
			if (result.value) {
				props.onDelete(e.target.id)
			}
		})
	}

	return (
		<div className="card my-1">
			<div className="card-body row">
				<div className="col-lg-4 col-4 p-0">
					<img src={props.photo ? url+'/'+props.photo : noimage} alt="img" className="w-100" />
				</div>
				<div className="col-lg-8 col-8">
					<h6>{props.name}</h6>
					<a className="d-block" href={`mailto:${props.email}`}>{props.email}</a>
					{props.username && <span className="d-block">{props.username}</span>}
					{props.address && <span className="d-block">{props.address}</span>}
					{ props.id && 
						<div className="mt-2">
							<NavLink className="btn btn-primary btn-sm" to={`/user/${props.id}`}>View Profile</NavLink>
							{props.btnEdit}
							<button type="button" className="btn btn-danger btn-sm" onClick={swallDelete}>
								<i className="fas fa-trash" id={props.id} name={props.name}></i>
							</button>
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default UserCard