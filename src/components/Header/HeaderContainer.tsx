import React from 'react'
import Header from './Header'
import { connect, ConnectedProps } from 'react-redux'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'

class HeaderContainer extends React.Component<propsFromRedux> {
	render() {
		return (
			<Header
				isAuth={this.props.isAuth}
				login={this.props.login}
				logout={this.props.logout}
			/>
		)
	}
}
const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
})
const connector = connect(mapStateToProps, { logout })

type propsFromRedux = ConnectedProps<typeof connector>
export default connector(HeaderContainer)
