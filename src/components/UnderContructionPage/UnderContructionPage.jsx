import underContruction from '../../assets/images/under_construction.png'
import React from 'react'
import s from './UnderContructionPage.module.css'
const UnderContructionPage = () => {
	return (
		<>
			<img
				src={underContruction}
				alt='underContruction'
				className={s.image}
			/>
		</>
	)
}

export default UnderContructionPage
