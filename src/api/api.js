import * as axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '7e7a2c29-9b4b-4143-a948-42f45610990b',
	},
})

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance
			.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data
			})
	},
	follow(userId) {
		return instance.post(`follow/${userId}`)
	},
	unfollow(userId) {
		return instance.delete(`follow/${userId}`)
	},
	getProfile(userId) {
		console.warn('Obsolete method. Please profileAPI object.')
		return profileAPI.getProfile(userId)
	},
}

export const profileAPI = {
	getProfile(userId) {
		debugger
		return instance.get('profile/' + userId)
	},
	getStatus(userId) {
		return instance.get('profile/status/' + userId)
	},
	updateStatus(status) {
		return instance.put('profile/status', { status: status })
	},
	savePhoto(photo) {
		let obj = new FormData()
		obj.append('images', photo)
		return instance.put('/profile/photo', obj)
	},
	saveUserInfo(profileInfo) {
		return instance.put('profile', profileInfo)
	},
}

export const authAPI = {
	getCaptcha() {
		return instance.get('security/get-captcha-url')
	},
	me() {
		return instance.get('auth/me')
	},
	login(email, password, rememberMe = false, captcha) {
		return instance.post('auth/login', {
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
