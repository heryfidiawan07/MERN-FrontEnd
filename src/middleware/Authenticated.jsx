// import axios from 'axios'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useRecoilValue, useRecoilState} from 'recoil'
import {authenticated} from '../store'

function Authenticated(props) {
	const history = useHistory()
	const token = useRecoilValue(authenticated)
	const [auth, setAuth] = useRecoilState(authenticated)
	
	useEffect(() => {
		if (!token.check) {
			localStorage.clear()
			setAuth({
				check: false,
				user: false,
			})
			history.push('/login')
		}
	}, [])
	return props.children
}

export default Authenticated