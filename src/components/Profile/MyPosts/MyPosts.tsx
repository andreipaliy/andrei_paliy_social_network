import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import {
	maxLengthCreator,
	required,
} from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls'
import { postType } from '../../../types/types'

const maxLength10 = maxLengthCreator(10)

let AddNewPostForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={s.newPostForm}>
				<div className={s.newPostInput}>
					<Field
						name='newPostText'
						component={Textarea}
						placeholder={'Post message'}
						validate={[required, maxLength10]}
					/>
				</div>
				<div>
					<button className={s.addPostBtn}>Add post</button>
				</div>
			</div>
		</form>
	)
}

let AddNewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(
	AddNewPostForm
)
export type MapStatePropsType = {
	posts: postType
	newPostText: string
}
export type MapDispatchPropsType = {
	addPost: () => void
}
type propType = MapStatePropsType & MapDispatchPropsType
const MyPosts: React.FC<propType> = React.memo(props => {
	let postsElements = [...props.posts]
		.reverse()
		.map((p, i) => (
			<Post key={i} message={p.message} likesCount={p.likesCount} />
		))

	// let newPostElement = React.createRef()

	let onAddPost = values => {
		props.addPost(values.newPostText)
	}

	return (
		<div className={s.postsBlock}>
			<AddNewPostFormRedux onSubmit={onAddPost} />
			<h3>My posts</h3>
			<div className={s.posts}>{postsElements}</div>
		</div>
	)
})

export default MyPosts
