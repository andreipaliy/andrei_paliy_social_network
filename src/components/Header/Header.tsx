import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logoHeader.png'

type propType = {
	isAuth: boolean
	login: string | null
	logout: () => void
}
const Header: React.FC<propType> = props => {
	return (
		<header className={s.header}>
			<NavLink to='/profile'>
				<img src={logo} className={s.logo} alt='Discuss' />
			</NavLink>

			<div className={s.loginBlock}>
				{props.isAuth ? (
					<div>
						<span className={s.userName}>{props.login}</span>
						<button onClick={props.logout} className={s.logoutBtn}>
							Log out
						</button>
					</div>
				) : (
					<NavLink to={'/login'} className={s.logoutBtn}>
						Login
					</NavLink>
				)}
			</div>
		</header>
	)
}

export default Header
