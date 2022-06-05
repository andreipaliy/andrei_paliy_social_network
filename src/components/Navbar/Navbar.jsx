import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

const Navbar = () => {
	return (
		<nav className={s.nav}>
			<aside className={s.aside}>
				<div className={s.item}>
					<NavLink
						to='/profile'
						activeClassName={s.activeLink}
						className={s.profile}
					>
						Profile
					</NavLink>
				</div>
				<div className={`${s.item} ${s.active}`}>
					<NavLink
						to='/dialogs'
						activeClassName={s.activeLink}
						className={s.dialogs}
					>
						Messages
					</NavLink>
				</div>
				<div className={`${s.item} ${s.active}`}>
					<NavLink
						to='/users'
						activeClassName={s.activeLink}
						className={s.users}
					>
						Users
					</NavLink>
				</div>

				<div className={cn(s.item, s.news)}>
					<NavLink to='/news'>News</NavLink>
				</div>
				<div className={cn(s.item, s.music)}>
					<NavLink to='/music'>Music</NavLink>
				</div>
				<div className={cn(s.item, s.settings)}>
					<NavLink to='/settings'>Settings</NavLink>
				</div>
			</aside>
		</nav>
	)
}

export default Navbar
