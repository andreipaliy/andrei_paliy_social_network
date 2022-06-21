import React from 'react'
import style from './../common/FormsControls/FormsControls.module.css'
import logo from '../../assets/images/logo.png'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { required } from '../../utils/validators/validators'
import { createField, Input } from '../common/FormsControls/FormsControls'
import { AppStateType } from '../../redux/redux-store'
import { InjectedFormProps } from 'redux-form'

type loginFormOwnPropsType = { captcha: string | null }

const LoginForm: React.FC<
	InjectedFormProps<formValuesType, loginFormOwnPropsType> &
		loginFormOwnPropsType
> = ({ handleSubmit, error, captcha }) => {
	return (
		<form onSubmit={handleSubmit} className={style.form}>
			{createField<loginFormNameType>(
				'Email',
				'email',
				[required],
				Input
			)}
			<div className={style.line}></div>
			{createField<loginFormNameType>(
				'Password',
				'password',
				[required],
				Input,
				{
					type: 'password',
				}
			)}
			<div className={style.line}></div>
			{createField<loginFormNameType>(
				undefined,
				'rememberMe',
				[],
				Input,
				{ type: 'checkbox' },
				'Remember me'
			)}
			{captcha && <img src={captcha} alt='CaptchaImg' />}
			{captcha &&
				createField<loginFormNameType>(
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

const LoginReduxForm = reduxForm<formValuesType, loginFormOwnPropsType>({
	form: 'login',
})(LoginForm)

type loginFormNameType = Extract<keyof formValuesType, string>

type formValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string | null
}
type loginPropsType = mapStateToPropsType & mapDispatchToPropsType
const Login: React.FC<loginPropsType> = props => {
	const onSubmit = (formData: formValuesType): void => {
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
type mapDispatchToPropsType = {
	login: (
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: null | string
	) => void
}
type mapStateToPropsType = {
	isAuth: boolean
	captcha: string | null
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
	isAuth: state.auth.isAuth,
	captcha: state.auth.url,
})

export default connect(mapStateToProps, { login })(Login)
