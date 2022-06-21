import { AppStateType, getActionsType } from './redux-store'
import { usersAPI, basicResultCodes } from '../api/api'
import { updateObjectInArray } from '../utils/object-helpers'
import { photosType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

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
		case 'FOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: true,
				}),
			}
		case 'UNFOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: false,
				}),
			}
		case 'SET_USERS': {
			return { ...state, users: action.users }
		}
		case 'SET_CURRENT_PAGE': {
			return { ...state, currentPage: action.currentPage }
		}
		case 'SET_TOTAL_USERS_COUNT': {
			return { ...state, totalUsersCount: action.count }
		}
		case 'TOGGLE_IS_FETCHING': {
			return { ...state, isFetching: action.isFetching }
		}
		case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsType = getActionsType<typeof actions>

export let actions = {
	followSuccess: (userId: number) =>
		({
			type: 'FOLLOW',
			userId,
		} as const),
	unfollowSuccess: (userId: number) =>
		({
			type: 'UNFOLLOW',
			userId,
		} as const),
	setUsers: (users: Array<userType>) =>
		({
			type: 'SET_USERS',
			users,
		} as const),
	setCurrentPage: (currentPage: number) =>
		({
			type: 'SET_CURRENT_PAGE',
			currentPage,
		} as const),
	setTotalUsersCount: (totalUsersCount: number) =>
		({
			type: 'SET_TOTAL_USERS_COUNT',
			count: totalUsersCount,
		} as const),
	toggleIsFetching: (isFetching: boolean) =>
		({
			type: 'TOGGLE_IS_FETCHING',
			isFetching,
		} as const),
	toggleFollowingProgress: (isFetching: boolean, userId: number) =>
		({
			type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
			isFetching,
			userId,
		} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const requestUsers = (page: number, pageSize: number): ThunkType => {
	return async dispatch => {
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setCurrentPage(page))
		let data = await usersAPI.getUsers(page, pageSize)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
		debugger
		dispatch(actions.setTotalUsersCount(data.totalCount))
	}
}

// const followUnfollowFlow = async (
// 	dispatch: Dispatch<ActionsType>,
// 	userId: number,
// 	apiMethod: any,
// 	actionCreator: (userId: number) => 'actions.followSuccess' | 'actions.unfollowSuccess'
// ) => {
// 	dispatch(actions.toggleFollowingProgress(true, userId))
// 	let response = await apiMethod(userId)

// 	if (response.data.resultCode === basicResultCodes.succesResponse) {
// 		dispatch(actionCreator(userId))
// 	}
// 	dispatch(actions.toggleFollowingProgress(false, userId))
// }

export const follow = (userId: number): ThunkType => {
	return async dispatch => {
		dispatch(actions.toggleFollowingProgress(true, userId))
		let response = await usersAPI.follow(userId)
		if (response.resultCode === basicResultCodes.succesResponse) {
			dispatch(actions.followSuccess(userId))
		}
		dispatch(actions.toggleFollowingProgress(false, userId))
	}
}
export const unfollow = (userId: number): ThunkType => {
	return async dispatch => {
		dispatch(actions.toggleFollowingProgress(true, userId))
		let response = await usersAPI.unfollow(userId)
		if (response.data.resultCode === basicResultCodes.succesResponse) {
			dispatch(actions.unfollowSuccess(userId))
		}
		dispatch(actions.toggleFollowingProgress(false, userId))
	}
}

export default usersReducer
