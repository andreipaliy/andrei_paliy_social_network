import { getActionsType } from './redux-store'
// import { authAPI } from '../api/api'
// import { stopSubmit } from 'redux-form'
import { getAuthUserData } from './auth-reducer'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'

export type initialStateType = {
	initialized: boolean
}
let initialState: initialStateType = {
	initialized: false,
}

const appReducer = (
	state = initialState,
	action: ActionsType
): initialStateType => {
	switch (action.type) {
		case 'INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			}

		default:
			return state
	}
}
type ActionsType = getActionsType<typeof actions>
export const actions = {
	initializedSuccess: () => ({
		type: 'INITIALIZED_SUCCESS',
	}),
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
export const initializeApp = (): ThunkType => dispatch => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}

export default appReducer
