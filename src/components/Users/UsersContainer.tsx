import React from 'react'
import { connect } from 'react-redux'
import {
	follow,
	setCurrentPage,
	unfollow,
	toggleFollowingProgress,
	requestUsers,
	userType,
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers,
} from '../../redux/users-selectors'
import { AppStateType } from '../../redux/redux-store'
type OwnPropsType = {
	title: string
}
type MapStatePropsType = {
	isFetching: boolean
	totalUsersCount: number
	pageSize: number
	currentPage: number
	users: Array<userType>
	followingInProgress: Array<number>
}
type MapDispatchPropsType = {
	getUsers: (currentPage: number, pageSize: number) => void
	// onPageChanged: (pageNumber: number) => void
	follow: (userId: number) => void
	unfollow: (userId: number) => void
}
type propType = MapDispatchPropsType & MapStatePropsType

class UsersContainer extends React.Component<propType> {
	componentDidMount() {
		const { currentPage, pageSize } = this.props
		this.props.getUsers(currentPage, pageSize)
	}

	onPageChanged = (pageNumber: number) => {
		const { pageSize } = this.props
		this.props.getUsers(pageNumber, pageSize)
	}

	render() {
		return (
			<>
				{this.props.isFetching ? <Preloader /> : null}
				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChanged={this.onPageChanged}
					users={this.props.users}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					followingInProgress={this.props.followingInProgress}
				/>
			</>
		)
	}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	}
}
// <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default connect<
	MapStatePropsType,
	MapDispatchPropsType,
	OwnPropsType,
	AppStateType
>(mapStateToProps, {
	follow,
	unfollow,
	// setCurrentPage,
	// toggleFollowingProgress,

	getUsers: requestUsers,
})(UsersContainer)
