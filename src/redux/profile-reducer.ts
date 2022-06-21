import { profileAPI, usersAPI, basicResultCodes } from '../api/api'
import { stopSubmit } from 'redux-form'
import { photosType, profileType, postType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, getActionsType } from './redux-store'

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
		case 'ADD_POST': {
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
		case 'SET_STATUS': {
			return {
				...state,
				status: action.status,
			}
		}
		case 'SET_USER_PROFILE': {
			return { ...state, profile: action.profile }
		}
		case 'UPLOAD_MAIN_PHOTO': {
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

		case 'DELETE_POST':
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId),
			}
		case 'UPDATE_PROFILE_INFO':
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

type ActionsType = getActionsType<typeof actions>

export const actions = {
	addPostActionCreator: (newPostText: string) =>
		({
			type: 'ADD_POST',
			newPostText,
		} as const),
	setPhoto: (photos: photosType | null) =>
		({
			type: 'UPLOAD_MAIN_PHOTO',
			photos,
		} as const),
	updateProfile: (profileInfo: any) =>
		({
			type: 'UPDATE_PROFILE_INFO',
			profileInfo,
		} as const),
	setUserProfile: (profile: any) =>
		({
			type: 'SET_USER_PROFILE',
			profile,
		} as const),
	deletePost: (postId: number) =>
		({
			type: 'DELETE_POST',
			postId,
		} as const),
	setStatus: (status: string) =>
		({
			type: 'SET_STATUS',
			status,
		} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getUserProfile =
	(userId: number): ThunkType =>
	async dispatch => {
		const response = await usersAPI.getProfile(userId)

		dispatch(actions.setUserProfile(response.data))
	}

export const getStatus =
	(userId: number): ThunkType =>
	async dispatch => {
		let response = await profileAPI.getStatus(userId)
		dispatch(actions.setStatus(response.data))
	}
export const savePhoto =
	(photo: any): ThunkType =>
	async dispatch => {
		let response = await profileAPI.savePhoto(photo)
		if (response.data.resultCode === basicResultCodes.succesResponse) {
			debugger
			dispatch(actions.setPhoto(response.data.data.photos))
		}
	}

export const updateStatus =
	(status: string): ThunkType =>
	async dispatch => {
		let response = await profileAPI.updateStatus(status)

		if (response.data.resultCode === basicResultCodes.succesResponse) {
			dispatch(actions.setStatus(status))
		}
	}
export const saveUserInfo =
	(profileInfo: profileType) => async (dispatch: any) => {
		let response = await profileAPI.saveUserInfo(profileInfo)
		if (response.data.resultCode === basicResultCodes.succesResponse) {
			dispatch(actions.updateProfile(profileInfo))
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
