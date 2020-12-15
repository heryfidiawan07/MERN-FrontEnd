// import axios from 'axios'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useRecoilValue} from 'recoil'
import {authenticated} from '../store'

function Guest(props) {
	const history = useHistory()
	const auth = useRecoilValue(authenticated)
	
	useEffect(() => {
		if (auth.check) {
			history.push('/dashboard')
		}
	}, [])
	return props.render
}

export default Guest