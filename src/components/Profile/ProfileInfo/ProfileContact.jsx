import React from 'react'
import { createField, Input } from '../../common/FormsControls/FormsControls'
import s from './ProfileContact.module.css'
import cn from 'classnames'

const ProfileContact = ({ contacts, editMode }) => {
	return (
		<>
			<h3 className={s.header}>Contacts</h3>
			{Object.keys(contacts).map(item => {
				return (
					<div key={item} className={s.contactItem}>
						<p className={cn(s.contactsHeader)}>{item + ':  '}</p>
						{editMode ? (
							createField(item, 'contacts.' + item, [], Input)
						) : (
							<a href={contacts[item]} className={s.contactInfo}>
								{contacts[item]}
							</a>
						)}
					</div>
				)
			})}
		</>
	)
}

export default ProfileContact
