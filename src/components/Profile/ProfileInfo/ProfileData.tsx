import React from 'react'
import ProfileContact from './ProfileContact'
import s from './ProfileData.module.css'
import { contactsType, profileType } from '../../../types/types'
type propType = {
	profile: profileType
	isOwner: boolean
	toggleEditMode: () => void
	contacts: contactsType
	editMode: boolean
}
const ProfileData: React.FC<propType> = ({
	profile,
	isOwner,
	toggleEditMode,
	contacts,
	editMode,
}) => {
	function goToEditMode() {
		toggleEditMode()
	}
	return (
		<div className={s.profileData}>
			<div>
				<div>
					<h3 className={s.name}>{profile.fullName}</h3>
				</div>

				<div>
					<span className={s.aboutMe}>
						<b className={s.descriptionItem}>About me: </b>
						{/* {profile.aboutMe || 'No information'} */}
					</span>
				</div>

				<div className={s.line}></div>
				<div className={s.lookingForAJob}>
					<span>
						<b>Looking for a job: </b>
						{profile.lookingForAJob ? 'Yes' : 'No'}
					</span>
				</div>
				<div className={s.lookingForAJobDescription}>
					<span>
						<b>Professional skills: </b>
						{profile.lookingForAJobDescription}
					</span>
				</div>
				{isOwner && (
					<button onClick={goToEditMode} className={s.editProfileBtn}>
						Edit profile data
					</button>
				)}
				<div className={s.line}></div>
				<ProfileContact editMode={editMode} contacts={contacts} />
			</div>
		</div>
	)
}

export default ProfileData
