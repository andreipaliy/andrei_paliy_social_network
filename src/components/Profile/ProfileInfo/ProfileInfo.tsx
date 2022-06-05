import React, { useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import ProfileData from './ProfileData'
import ProfileDataForm from './ProfileDataForm'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import choosePhoto from '../../../assets/images/choosePhoto.png'
import { profileType } from '../../../types/types'
import { InjectedFormProps } from 'redux-form'

type propType = {
	profile: profileType
	status: string
	updateStatus: (status: string) => void
	isOwner: boolean
	savePhoto: (photo: any) => void
	userId: null | number
	saveUserInfo: (profileInfo: profileType) => any
}
const ProfileInfo: React.FC<propType> = ({
	profile,
	status,
	updateStatus,
	isOwner,
	savePhoto,
	userId,
	saveUserInfo,
}) => {
	let [editMode, setEditMode] = useState<boolean>(false)
	if (!profile) {
		return <Preloader />
	}
	function mainPhotoSelected(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files !== null) savePhoto(e.target.files[0])
	}
	function onSubmit(formData: any): any {
		saveUserInfo(formData).then(() => setEditMode(false))
	}

	//
	return (
		<div className={s.descriptionBlock}>
			<div>
				{profile.photos.large === null ? (
					<img
						alt='profile'
						src='https://cdn.impactinit.com/cdn/x/x@7699849ecc/smss53/smsimg28/pv/ingimagecontributors/ing_47129_13274.jpg'
						className={s.profilePic}
					/>
				) : (
					<img
						alt='profile'
						src={profile.photos.large}
						className={s.profilePic}
					/>
				)}

				{isOwner ? (
					<label htmlFor='inputTag' className={s.changeProfilePicBtn}>
						<input
							type='file'
							onChange={mainPhotoSelected}
							className={s.changeProfilePicBtn}
							id='inputTag'
						/>
						<p>Choose a photo</p>
						<img src={choosePhoto} alt='chooseIcon' />
					</label>
				) : null}
				<ProfileStatusWithHooks
					status={status}
					updateStatus={updateStatus}
				/>
			</div>
			<div className={s.horisontalLine}></div>
			{!editMode ? (
				<ProfileData
					toggleEditMode={() => setEditMode(true)}
					profile={profile}
					isOwner={isOwner}
					editMode={editMode}
					contacts={profile.contacts}
				/>
			) : (
				<ProfileDataForm
					initialValues={profile}
					onSubmit={onSubmit}
					editMode={editMode}
					contacts={profile.contacts}
				/>
			)}
		</div>
	)
}

export default ProfileInfo
