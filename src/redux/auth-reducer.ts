import { authAPI, basicResultCodes, captchaResultCode } from '../api/api'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, getActionsType } from './redux-store'

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
		case 'SET_USER_DATA':
		case 'SET_CAPTCHA_SUCCESS':
			return {
				...state,
				...action.payload,
			}

		default:
			return state
	}
}
// type ActionsType = setAuthUserDataActionType | setCapthaActionCreatorType
type ActionsType = getActionsType<typeof actions>

export const actions = {
	setAuthUserData: (
		userId: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean,
		captcha: string | null
	) => ({
		type: 'SET_USER_DATA',
		payload: { userId, email, login, isAuth, url: captcha },
	}),

	setCaptha: (url: string) => ({
		type: 'SET_CAPTCHA_SUCCESS',
		payload: { url },
	}),
}
// type setAuthUserDataActionPayloadType = {
// 	userId: number | null
// 	email: string | null
// 	login: string | null
// 	isAuth: boolean
// 	url: string | null
// }
// type setAuthUserDataActionType = {
// 	type: typeof SET_USER_DATA
// 	payload: setAuthUserDataActionPayloadType
// }

// type setCapthaActionCreatorType = {
// 	type: typeof SET_CAPTCHA_SUCCESS
// 	payload: { url: string }
// }

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getAuthUserData = (): ThunkType => async dispatch => {
	let response = await authAPI.me()

	if (response.data.resultCode === basicResultCodes.succesResponse) {
		let { id, login, email } = response.data.data
		dispatch(actions.setAuthUserData(id, email, login, true, ''))
	}
}

export const getCaptcha = (): ThunkType => async dispatch => {
	let response = await authAPI.getCaptcha()

	let url = response.data.url
	dispatch(actions.setCaptha(url))
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
		if (response.data.resultCode === basicResultCodes.succesResponse) {
			dispatch(getAuthUserData())
		} else {
			if (response.data.resultCode === captchaResultCode.captha) {
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

	if (response.data.resultCode === basicResultCodes.succesResponse) {
		dispatch(actions.setAuthUserData(null, null, null, false, null))
	}
}

export default authReducer
