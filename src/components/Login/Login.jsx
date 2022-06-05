import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { required } from '../../utils/validators/validators'
import { createField, Input } from '../common/FormsControls/FormsControls'
import style from './../common/FormsControls/FormsControls.module.css'
import logo from '../../assets/images/logo.png'

const LoginForm = ({ handleSubmit, error, captcha }) => {
	return (
		<form onSubmit={handleSubmit} className={style.form}>
			{createField('Email', 'email', [required], Input)}
			<div className={style.line}></div>
			{createField('Password', 'password', [required], Input, {
				type: 'password',
			})}
			<div className={style.line}></div>
			{createField(
				null,
				'rememberMe',
				[],
				Input,
				{ type: 'checkbox' },
				'Remember me'
			)}
			{captcha && <img src={captcha} alt='CaptchaImg' />}
			{captcha &&
				createField(
					'Write the symbols above',
					'captcha',
					[required],
					Input
				)}
			{error && <div className={style.formSummaryError}>{error}</div>}
			<button className={style.loginBtn}>Login</button>
		</form>
	)
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = props => {
	const onSubmit = formData => {
		props.login(
			formData.email,
			formData.password,
			formData.rememberMe,
			formData.captcha
		)
	}

	if (props.isAuth) {
		return <Redirect to={'/profile'} />
	}

	return (
		<div className={style.loginForm}>
			<h1 className={style.header}>Welcome</h1>
			<img src={logo} className={style.logo} alt='siteLogo' />
			<LoginReduxForm onSubmit={onSubmit} captcha={props.captcha} />
		</div>
	)
}
const mapStateToProps = state => ({
	isAuth: state.auth.isAuth,
	captcha: state.auth.url,
})

export default connect(mapStateToProps, { login })(Login)
