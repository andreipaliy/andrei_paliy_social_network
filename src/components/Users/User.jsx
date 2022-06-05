import React from 'react'
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom'

let User = ({ user, followingInProgress, unfollow, follow }) => {
	return (
		<div className={s.userCard}>
			<div>
				<NavLink to={'/profile/' + user.id}>
					<img
						alt='profilePic'
						src={
							user.photos.small != null
								? user.photos.small
								: userPhoto
						}
						className={s.userPhoto}
					/>
				</NavLink>
			</div>
			<span>
				<span>
					<div className={s.name}>{user.name}</div>
					{/* <div>{user.status}</div> */}
				</span>
				{/* <span>
							<div>{'user.location.country'}</div>
							<div>{'user.location.city'}</div>
						</span> */}
			</span>
			<div>
				{user.followed ? (
					<button
						className={s.followUnfollowBtn}
						disabled={followingInProgress.some(
							id => id === user.id
						)}
						onClick={() => {
							unfollow(user.id)
						}}
					>
						Unfollow
					</button>
				) : (
					<button
						className={s.followUnfollowBtn}
						disabled={followingInProgress.some(
							id => id === user.id
						)}
						onClick={() => {
							follow(user.id)
						}}
					>
						Follow
					</button>
				)}
			</div>
		</div>
	)
}

export default User
