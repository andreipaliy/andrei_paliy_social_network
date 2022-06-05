import React from 'react'
import { Form, reduxForm } from 'redux-form'
import {
	createField,
	Input,
	Textarea,
} from '../../common/FormsControls/FormsControls'
import ProfileContact from './ProfileContact'
import s from './ProfileDataForm.module.css'
const ProfileDataForm = ({ handleSubmit, editMode, contacts, error }) => {
	return (
		<Form onSubmit={handleSubmit}>
			{error && <div className={s.formSummaryError}>{error}</div>}
			<div className={s.profileItem}>
				<p className={s.profileHeader}>Fullname: </p>
				{createField('Fullname', 'fullName', [], Input)}
			</div>
			<div className={s.profileItem}>
				<p className={s.profileHeader}>My professional skills: </p>
				{createField(
					'My professional skills',
					'lookingForAJobDescription',
					[],
					Textarea
				)}
			</div>

			<div className={s.profileItem}>
				<p className={s.profileHeader}>Looking for a job: </p>
				{createField('lookingForAJob', 'lookingForAJob', [], Input, {
					type: 'checkbox',
				})}
			</div>
			<div className={s.profileItem}>
				<p className={s.profileHeader}>About me: </p>
				{createField('About me', 'aboutMe', [], Textarea)}
			</div>
			<ProfileContact editMode={editMode} contacts={contacts} />
			<button className={s.saveBtn}>Save changes</button>
		</Form>
	)
}

export default reduxForm({ form: 'profileInfo' })(ProfileDataForm)
