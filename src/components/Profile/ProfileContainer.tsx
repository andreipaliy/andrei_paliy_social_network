import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { compose } from 'redux'
import Profile from './Profile'
import {
	getStatus,
	getUserProfile,
	updateStatus,
	savePhoto,
	saveUserInfo,
} from '../../redux/profile-reducer'
import { profileType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
	profile: profileType
	status: string
	authorizedUserId: null | number
	isAuth: boolean
}
type MapDispatchPropsType = {
	getUserProfile: (userId: number) => void
	getStatus: (userId: number) => void
	updateStatus: (status: string) => void
	savePhoto: (photo: any) => void
	saveUserInfo: (profileInfo: profileType) => any
}
type PathParamsType = {
	userId: string | undefined
}
type propType = MapStatePropsType &
	MapDispatchPropsType &
	RouteComponentProps<PathParamsType>
class ProfileContainer extends React.Component<propType> {
	refreshProfile() {
		let userId: string | undefined | null | number =
			this.props.match.params.userId
		if (!userId) {
			userId = this.props.authorizedUserId
			if (!userId) {
				this.props.history.push('/login')
			}
		}
		if (userId !== null) {
			this.props.getUserProfile(+userId)
			this.props.getStatus(+userId)
		}
	}
	componentDidUpdate(prevProps: propType) {
		if (prevProps.match.params.userId !== this.props.match.params.userId) {
			this.refreshProfile()
		}
	}
	componentDidMount() {
		this.refreshProfile()
	}

	render() {
		return (
			<Profile
				{...this.props}
				savePhoto={this.props.savePhoto}
				userId={this.props.authorizedUserId}
				isOwner={!this.props.match.params.userId}
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				saveUserInfo={this.props.saveUserInfo}
			/>
		)
	}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth,
	}
}
type OwnPropsType = {}
export default compose(
	connect<
		MapStatePropsType,
		MapDispatchPropsType,
		OwnPropsType,
		AppStateType
	>(mapStateToProps, {
		getUserProfile,
		getStatus,
		updateStatus,
		savePhoto,
		saveUserInfo,
	}),
	withRouter
)(ProfileContainer)
