import React, { useState, useEffect } from 'react'
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = props => {
	let [editMode, setEditMode] = useState(false)
	let [status, setStatus] = useState(props.status)

	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}

	const onStatusChange = e => {
		setStatus(e.currentTarget.value)
	}

	return (
		<div className={s.status}>
			<b>Status: </b>
			{!editMode && (
				<span onClick={activateEditMode} className={s.statusSpan}>
					{props.status || '-------'}
				</span>
			)}
			{editMode && (
				<div>
					<textarea
						onChange={onStatusChange}
						autoFocus={true}
						onBlur={deactivateEditMode}
						value={status}
						className={s.textarea}
					/>
				</div>
			)}
		</div>
	)
}

export default ProfileStatusWithHooks
