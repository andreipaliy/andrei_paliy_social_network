export type photosType = {
	large: string | null
	small?: string | null
}
export type profileType = {
	userId: number | null
	lookingForAJob?: boolean | null
	lookingForAJobDescription?: string | null
	fullName: string | null
	contacts: contactsType
	photos: photosType
}
export type contactsType = {
	github: string | null
	vk: string | null
	facebook: string | null
	instagram: string | null
	twitter: string | null
	website: string | null
	youtube: string | null
	mainLink: string | null
}
export type postType = {
	id: number
	message: string
	likesCount: number
}
