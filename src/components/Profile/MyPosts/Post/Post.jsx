import React from 'react'
import s from './Post.module.css'
import logo from '../../../../assets/images/user.png'

const Post = props => {
	return (
		<div className={s.item}>
			<div className={s.userPost}>
				<img src={logo} alt='logoPic' />
				<p>Andrei Palii</p>
			</div>

			<div className={s.postMessage}>{props.message}</div>
			<div className={s.likesCount}>
				<button href='#'>{props.likesCount}</button>
			</div>
		</div>
	)
}

export default Post
