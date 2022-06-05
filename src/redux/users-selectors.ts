import { userType } from './users-reducer'

import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'

const getUsersSelector = (state: AppStateType) => {
	return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, users => {
	return users.filter((u: userType) => true)
})

export const getPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
	return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress
}

export const countSomethingDifficult = (state: AppStateType) => {
	//for... math... big arrays
	let count = 23
	return count
}
