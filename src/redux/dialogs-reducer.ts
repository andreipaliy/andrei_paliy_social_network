import { getActionsType } from './redux-store'
type usersType = {
	id: number
	name: string
}
type messagesType = {
	id: number
	message: string
}
type initialStateType = {
	dialogs: Array<usersType>
	messages: Array<messagesType>
}
let initialState: initialStateType = {
	dialogs: [
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Andrew' },
		{ id: 3, name: 'Mike' },
		{ id: 4, name: 'Sasha' },
		{ id: 5, name: 'Marius' },
		{ id: 6, name: 'Miko' },
	],
	messages: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How you did it?' },
		{ id: 3, message: 'Yo' },
		{ id: 4, message: 'Yo' },
		{ id: 5, message: 'Yo' },
	],
}

const dialogsReducer = (
	state = initialState,
	action: ActionType
): initialStateType => {
	switch (action.type) {
		case 'SEND_MESSAGE':
			let body = action.newMessageBody
			return {
				...state,
				messages: [...state.messages, { id: 6, message: body }],
			}
		default:
			return state
	}
}
type ActionType = getActionsType<typeof actions>

export const actions = {
	sendMessageCreator: (newMessageBody: string) => ({
		type: 'SEND_MESSAGE',
		newMessageBody,
	}),
}

export default dialogsReducer
