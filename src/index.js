import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'

import App from './App'
import reportWebVitals from './reportWebVitals'

import {RecoilRoot} from 'recoil'
import {BrowserRouter} from 'react-router-dom'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<Suspense fallback={<div>Loading . . . </div>}>
				<BrowserRouter>
		    		<App />
		    	</BrowserRouter>
		    </Suspense>
	    </RecoilRoot>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
