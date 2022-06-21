import axios from 'axios'
import { profileType } from '../types/types'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '7e7a2c29-9b4b-4143-a948-42f45610990b',
	},
})
export enum basicResultCodes {
	succesResponse = 0,
	failResponse = 1,
}
export enum captchaResultCode {
	captha = 10,
}
export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance
			.get<requestUsersType>(
				`users?page=${currentPage}&count=${pageSize}`
			)
			.then(response => {
				return response.data
			})
	},
	follow(userId: number) {
		return instance.post<requestType>(`follow/${userId}`).then(response => {
			return response.data
		})
	},
	unfollow(userId: number) {
		return instance.delete(`follow/${userId}`).then(response => {
			return response
		})
	},
	getProfile(userId: number) {
		console.warn('Obsolete method. Please profileAPI object.')
		return profileAPI.getProfile(userId)
	},
}

export const profileAPI = {
	getProfile(userId: number) {
		debugger
		return instance.get<profileType>('profile/' + userId)
	},
	getStatus(userId: number) {
		return instance.get<string>('profile/status/' + userId)
	},
	updateStatus(status: string) {
		return instance.put<requestType>('profile/status', { status: status })
	},
	savePhoto(photo: any) {
		let obj = new FormData()
		obj.append('images', photo)
		return instance.put<requestPhotoType>('/profile/photo', obj)
	},

	saveUserInfo(profileInfo: profileType) {
		return instance.put<requestType>('profile', profileInfo)
	},
}

export const authAPI = {
	getCaptcha() {
		return instance.get<{ url: string }>('security/get-captcha-url')
	},
	me() {
		return instance.get<requestAuthType>('auth/me')
	},
	login(
		email: string,
		password: string,
		rememberMe = false,
		captcha: null | string
	) {
		return instance.post<requestProfileType>('auth/login', {
			email,
			password,
			rememberMe,
			captcha,
		})
	},
	logout() {
		return instance.delete('auth/login')
	},
}

type requestType = {
	resultCode: basicResultCodes | captchaResultCode
	messages: Array<string>
	data: Object
}
type requestProfileType = {
	resultCode: basicResultCodes | captchaResultCode
	messages: Array<string>
	data: { userId: number }
}

type requestAuthType = {
	resultCode: basicResultCodes | captchaResultCode
	messages: Array<string>
	data: { id: number; email: string; login: string }
}
type requestPhotoType = {
	resultCode: basicResultCodes | captchaResultCode
	messages: Array<string>
	data: { photos: { large: string; small: string } }
}
type requestUsersType = {
	items: Array<requestedUserItemType>
	totalCount: number
	error: null | string
}
type requestedUserItemType = {
	id: number
	name: string
	status: string | null
	followed: boolean
	photos: { small: string | null; large: string | null }
}
