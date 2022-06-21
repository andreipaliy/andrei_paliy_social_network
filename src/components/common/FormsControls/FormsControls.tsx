import styles from './FormsControls.module.css'
import { fieldValidatorType } from '../../../utils/validators/validators'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import React from 'react'

type formControlsParamsType = {
	meta: WrappedFieldMetaProps
	children: React.ReactNode
}
const FormControl: React.FC<formControlsParamsType> = ({
	meta: { touched, error },
	children,
}) => {
	const hasError = touched && error
	return (
		<>
			<span
				className={
					styles.formControl + ' ' + (hasError ? styles.error : '')
				}
			>
				<div>{children}</div>
				{hasError && <span>{error}</span>}
			</span>
		</>
	)
}

export const Textarea: React.FC<WrappedFieldProps> = props => {
	// const { input, meta, child, ...restProps } = props
	const { input, meta, ...restProps } = props
	return (
		<FormControl {...props}>
			<textarea {...input} {...restProps} className={styles.textArea} />
		</FormControl>
	)
}
type inputComponentPropsType = {
	input: string
	meta: WrappedFieldMetaProps
	child: any
}
export const Input: React.FC<WrappedFieldProps> = props => {
	const { input, meta, ...restProps } = props
	return (
		<FormControl {...props}>
			<input {...input} {...restProps} />
		</FormControl>
	)
}

export const createField = <formKeysType extends string>(
	placeholder: string | undefined,
	name: formKeysType,
	validators: Array<fieldValidatorType>,
	component: React.FC<WrappedFieldProps>,
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
