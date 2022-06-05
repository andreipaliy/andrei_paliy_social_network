import React from 'react'
import s from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom'

const DialogItem = props => {
	let path = '/dialogs/' + props.id

	return (
		<div className={s.dialog + ' ' + s.active}>
			<NavLink
				to={path}
				activeClassName={s.activeDialog}
				className={s.dialog}
			>
				{props.name}
			</NavLink>
		</div>
	)
}

export default DialogItem
