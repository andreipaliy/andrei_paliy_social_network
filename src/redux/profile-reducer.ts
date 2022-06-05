import { profileAPI, usersAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { photosType, profileType, postType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'
import { Dispatch } from 'redux'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const UPLOAD_MAIN_PHOTO = 'UPLOAD_MAIN_PHOTO'
const UPDATE_PROFILE_INFO = 'UPDATE_PROFILE_INFO'

type initialStateType = {
	posts: Array<postType>
	profile: profileType
	status: string
	newPostText: string
}
let initialState: initialStateType = {
	posts: [
		{
			id: 1,
			message:
				'Is there a Google Maps analog that doesn’t require API keys or a billing account? i just want an online example with a map',
			likesCount: 12,
		},
		{
			id: 2,
			message:
				'My perfect temperature scale	0°D = 0°C = 32°F: water freezing. this is useful because negative temperature tells you to take ice skates instead of umbrella. 100°D = 42°C = 107,6°F: you don’t want to go outside. you also don’t want to see this on your body hermometer',
			likesCount: 11,
		},
		{
			id: 3,
			message:
				'One of the perks of being a European  is that you are allowed to feel smug about Americans not understanding the Celsius temperatures, but the fact that you don’t understand the Fahrenheit temperatures is totally okay. good, even',
			likesCount: 11,
		},
		{
			id: 4,
			message:
				'Remember when apple made matte macbook monitors and then in 2010 they wanted vibrant colors or whatever and now it’s impossible to work in the sun? those were the days',
			likesCount: 15,
		},
	],
	profile: {
		userId: null,
		lookingForAJob: null,
		lookingForAJobDescription: null,
		fullName: null,
		contacts: {
			github: null,
			vk: null,
			facebook: null,
			instagram: null,
			twitter: null,
			website: null,
			youtube: null,
			mainLink: null,
		},
		photos: {
			large: null,
			small: null,
		},
	},
	status: '' as string,
	newPostText: '',
}

const profileReducer = (
	state = initialState,
	action: ActionsType
): initialStateType => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 5,
				message: action.newPostText,
				likesCount: 0,
			}
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: '',
			}
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status,
			}
		}
		case SET_USER_PROFILE: {
			return { ...state, profile: action.profile }
		}
		case UPLOAD_MAIN_PHOTO: {
			debugger
			return {
				...state,
				profile: {
					...state.profile,
					photos: {
						...state.profile.photos,
						large:
							action.photos !== null ? action.photos.large : null,
					},
				},
			}
		}

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId),
			}
		case UPDATE_PROFILE_INFO:
			return {
				...state,
				profile: {
					...action.profileInfo,
					photos: {
						...state.profile.photos,
					},
					contacts: {
						...action.profileInfo.contacts,
					},
				},
			}
		default:
			return state
	}
}
type ActionsType =
	| addPostActionCreatorType
	| setPhotoType
	| updateProfileType
	| setUserProfileType
	| setStatusType
	| deletePostType

type addPostActionCreatorType = {
	type: typeof ADD_POST
	newPostText: string
}
export const addPostActionCreator = (
	newPostText: string
): addPostActionCreatorType => ({
	type: ADD_POST,
	newPostText,
})

type setPhotoType = {
	type: typeof UPLOAD_MAIN_PHOTO
	photos: photosType | null
}
export const setPhoto = (photos: photosType | null): setPhotoType => ({
	type: UPLOAD_MAIN_PHOTO,
	photos,
})

type updateProfileType = {
	type: typeof UPDATE_PROFILE_INFO
	profileInfo: any
}
export const updateProfile = (profileInfo: any): updateProfileType => ({
	type: UPDATE_PROFILE_INFO,
	profileInfo,
})
type setUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: any
}
export const setUserProfile = (profile: any): setUserProfileType => ({
	type: SET_USER_PROFILE,
	profile,
})
type setStatusType = { type: typeof SET_STATUS; status: string }
export const setStatus = (status: string): setStatusType => ({
	type: SET_STATUS,
	status,
})

type deletePostType = {
	type: typeof DELETE_POST
	postId: number
}
export const deletePost = (postId: number): deletePostType => ({
	type: DELETE_POST,
	postId,
})
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getUserProfile =
	(userId: number): ThunkType =>
	async dispatch => {
		const response = await usersAPI.getProfile(userId)

		dispatch(setUserProfile(response.data))
	}

export const getStatus =
	(userId: number): ThunkType =>
	async dispatch => {
		let response = await profileAPI.getStatus(userId)
		dispatch(setStatus(response.data))
	}
export const savePhoto =
	(photo: any): ThunkType =>
	async dispatch => {
		let response = await profileAPI.savePhoto(photo)
		if (response.data.resultCode === 0) {
			debugger
			dispatch(setPhoto(response.data.data.photos))
		}
	}

export const updateStatus =
	(status: string): ThunkType =>
	async dispatch => {
		let response = await profileAPI.updateStatus(status)

		if (response.data.resultCode === 0) {
			dispatch(setStatus(status))
		}
	}
export const saveUserInfo =
	(profileInfo: profileType) => async (dispatch: any) => {
		let response = await profileAPI.saveUserInfo(profileInfo)
		if (response.data.resultCode === 0) {
			dispatch(updateProfile(profileInfo))
		} else {
			let message =
				response.data.messages.length > 0
					? response.data.messages[0]
					: 'Some error'
			dispatch(stopSubmit('profileInfo', { _error: message }))
			return Promise.reject(response.data.messages[0])
		}
	}

export default profileReducer
