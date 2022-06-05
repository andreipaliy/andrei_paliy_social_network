import React, { FC } from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import s from './Users.module.css'
import { userType } from '../../redux/users-reducer'
type propType = {
	currentPage: number
	totalUsersCount: number
	pageSize: number
	onPageChanged: (pageNumber: number) => void
	users: Array<userType>
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	followingInProgress: Array<number>
}
let Users: FC<propType> = ({
	currentPage,
	totalUsersCount,
	pageSize,
	onPageChanged,
	users,
	...props
}) => {
	return (
		<div className={s.userPage}>
			<div>
				<Paginator
					currentPage={currentPage}
					onPageChanged={onPageChanged}
					totalItemsCount={totalUsersCount}
					pageSize={pageSize}
				/>
				<div className={s.line}></div>
				<div>
					{users.map(u => (
						<User
							user={u}
							followingInProgress={props.followingInProgress}
							key={u.id}
							unfollow={props.unfollow}
							follow={props.follow}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Users
