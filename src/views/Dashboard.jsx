import React from 'react'
import {useRecoilValue} from 'recoil'
import {authenticated} from '../store'

function Dashboard() {
	const auth = useRecoilValue(authenticated)
	// console.log('DASHBOARD',auth)
	return (
		<h5>Dashboard</h5>
	)
}

export default Dashboard