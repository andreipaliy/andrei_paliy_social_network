import React from 'react'
import styles from './FormsControls.module.css'
// import { required } from '../../../utils/validators/validators'
import { Field } from 'redux-form'

const FormControl = ({ input, meta: { touched, error }, children }) => {
	const hasError = touched && error
	return (
		<span
			className={
				styles.formControl + ' ' + (hasError ? styles.error : '')
			}
		>
			<div>{children}</div>
			{hasError && <span>{error}</span>}
		</span>
	)
}

export const Textarea = props => {
	const { input, meta, child, ...restProps } = props
	return (
		<FormControl {...props}>
			<textarea {...input} {...restProps} className={styles.textArea} />
		</FormControl>
	)
}

export const Input = props => {
	const { input, meta, child, ...restProps } = props
	return (
		<FormControl {...props}>
			<input {...input} {...restProps} />
		</FormControl>
	)
}

export const createField = (
	placeholder,
	name,
	validators,
	component,
	props = {},
	text = ''
) => (
	<>
		<Field
			placeholder={placeholder}
			name={name}
			validate={validators}
			component={component}
			{...props}
			className={styles.input}
		/>
		{text}
	</>
)
