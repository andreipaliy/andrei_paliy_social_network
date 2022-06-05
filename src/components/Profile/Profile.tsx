import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import s from './Profile.module.css'
import { profileType } from '../../types/types'

type propsType = {
	savePhoto: (photo: any) => void
	saveUserInfo: (profileInfo: profileType) => any
	updateStatus: (status: string) => void
	isOwner: boolean
	profile: profileType
	status: string
	userId: null | number
}
const Profile = (props: propsType) => {
	return (
		<div className={s.profilePage}>
			<ProfileInfo
				savePhoto={props.savePhoto}
				isOwner={props.isOwner}
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus}
				userId={props.userId}
				saveUserInfo={props.saveUserInfo}
			/>
			<MyPostsContainer />
		</div>
	)
}

export default Profile
