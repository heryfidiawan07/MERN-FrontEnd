import React from 'react'

function Button(props) {
	return (
		<button {...props}>{props.title || props.icon}</button>
	)
}

export default Button