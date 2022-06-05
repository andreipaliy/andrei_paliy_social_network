import { AppStateType } from './redux-store'
import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../utils/object-helpers'
import { photosType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

export type userType = {
	name: string
	id: number
	photos: photosType
	status: null | string
	followed: boolean
}
let initialState = {
	users: [] as Array<userType>,
	pageSize: 20,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>, // array of user's ids
	fake: 10,
}
export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: true,
				}),
			}
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: false,
				}),
			}
		case SET_USERS: {
			return { ...state, users: action.users }
		}
		case SET_CURRENT_PAGE: {
			return { ...state, currentPage: action.currentPage }
		}
		case SET_TOTAL_USERS_COUNT: {
			return { ...state, totalUsersCount: action.count }
		}
		case TOGGLE_IS_FETCHING: {
			return { ...state, isFetching: action.isFetching }
		}
		case TOGGLE_IS_FOLLOWING_PROGRESS: {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(
							id => id !== action.userId
					  ),
			}
		}
		default:
			return state
	}
}
type ActionsType =
	| followSuccess
	| unfollowSuccess
	| setUsersType
	| setCurrentPageType
	| setTotalUsersCountType
	| toggleIsFetchingType
	| toggleFollowingProgressType
type followSuccess = {
	type: typeof FOLLOW
	userId: number
}
export const followSuccess = (userId: number): followSuccess => ({
	type: FOLLOW,
	userId,
})

type unfollowSuccess = {
	type: typeof UNFOLLOW
	userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccess => ({
	type: UNFOLLOW,
	userId,
})

type setUsersType = {
	type: typeof SET_USERS
	users: Array<userType>
}
export const setUsers = (users: Array<userType>): setUsersType => ({
	type: SET_USERS,
	users,
})

type setCurrentPageType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({
	type: SET_CURRENT_PAGE,
	currentPage,
})
type setTotalUsersCountType = {
	type: typeof SET_TOTAL_USERS_COUNT
	count: number
}
export const setTotalUsersCount = (
	totalUsersCount: number
): setTotalUsersCountType => ({
	type: SET_TOTAL_USERS_COUNT,
	count: totalUsersCount,
})
type toggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const toggleIsFetching = (
	isFetching: boolean
): toggleIsFetchingType => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
})

type toggleFollowingProgressType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFetching: boolean
	userId: number
}
export const toggleFollowingProgress = (
	isFetching: boolean,
	userId: number
): toggleFollowingProgressType => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId,
})
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const requestUsers = (page: number, pageSize: number): ThunkType => {
	return async dispatch => {
		dispatch(toggleIsFetching(true))
		dispatch(setCurrentPage(page))
		let data = await usersAPI.getUsers(page, pageSize)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		debugger
		dispatch(setTotalUsersCount(data.totalCount))
	}
}

const followUnfollowFlow = async (
	dispatch: Dispatch<ActionsType>,
	userId: number,
	apiMethod: any,
	actionCreator: (userId: number) => followSuccess | unfollowSuccess
) => {
	dispatch(toggleFollowingProgress(true, userId))
	let response = await apiMethod(userId)

	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
	return async dispatch => {
		followUnfollowFlow(
			dispatch,
			userId,
			usersAPI.follow.bind(usersAPI),
			followSuccess
		)
	}
}
export const unfollow = (userId: number): ThunkType => {
	return async dispatch => {
		followUnfollowFlow(
			dispatch,
			userId,
			usersAPI.unfollow.bind(usersAPI),
			unfollowSuccess
		)
	}
}

export default usersReducer
