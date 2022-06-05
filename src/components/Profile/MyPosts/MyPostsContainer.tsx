import { addPostActionCreator } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { MapStatePropsType, MapDispatchPropsType } from './MyPosts'

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
	}
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
	return {
		addPost: (newPostText: string) => {
			dispatch(addPostActionCreator(newPostText))
		},
	}
}
type OwnPropsType = {}
const MyPostsContainer = connect<
	MapStatePropsType,
	MapDispatchPropsType,
	OwnPropsType,
	AppStateType
>(
	mapStateToProps,
	mapDispatchToProps
)(MyPosts)

export default MyPostsContainer
