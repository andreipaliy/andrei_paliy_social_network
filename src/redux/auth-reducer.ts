import { authAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'
const SET_CAPTCHA_SUCCESS = 'samurai-network/auth/SET_CAPTCHA_SUCCESS'

type initialStateType = {
	userId: null | number
	email: null | string
	login: null | string
	isAuth: boolean
	url: null | string
}
let initialState: initialStateType = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	url: null,
}

const authReducer = (
	state = initialState,
	action: ActionsType
): initialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
		case SET_CAPTCHA_SUCCESS:
			return {
				...state,
				...action.payload,
			}

		default:
			return state
	}
}
type ActionsType = setAuthUserDataActionType | setCapthaActionCreatorType
type setAuthUserDataActionPayloadType = {
	userId: number | null
	email: string | null
	login: string | null
	isAuth: boolean
	url: string | null
}
type setAuthUserDataActionType = {
	type: typeof SET_USER_DATA
	payload: setAuthUserDataActionPayloadType
}
export const setAuthUserData = (
	userId: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean,
	captcha: string | null
): setAuthUserDataActionType => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth, url: captcha },
})

type setCapthaActionCreatorType = {
	type: typeof SET_CAPTCHA_SUCCESS
	payload: { url: string }
}
export const setCaptha = (url: string): setCapthaActionCreatorType => ({
	type: SET_CAPTCHA_SUCCESS,
	payload: { url },
})
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getAuthUserData = (): ThunkType => async dispatch => {
	let response = await authAPI.me()

	if (response.data.resultCode === 0) {
		let { id, login, email } = response.data.data
		dispatch(setAuthUserData(id, email, login, true, ''))
	}
}

export const getCaptcha = (): ThunkType => async dispatch => {
	let response = await authAPI.getCaptcha()

	let url = response.data.url
	dispatch(setCaptha(url))
}

export const login =
	(
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: null | string
	): ThunkType =>
	async (dispatch: any) => {
		let response = await authAPI.login(email, password, rememberMe, captcha)
		if (response.data.resultCode === 0) {
			dispatch(getAuthUserData())
		} else {
			if (response.data.resultCode === 10) {
				dispatch(getCaptcha())
			}
			let message =
				response.data.messages.length > 0
					? response.data.messages[0]
					: 'Some error'
			dispatch(stopSubmit('login', { _error: message }))
		}
	}

export const logout = (): ThunkType => async dispatch => {
	let response = await authAPI.logout()

	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false, null))
	}
}

export default authReducer
