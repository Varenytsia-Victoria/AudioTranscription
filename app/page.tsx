'use client'

import StripeContext from '@/src/context/StripeContext'
import React from 'react'

const Home: React.FC = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
			<div className='w-full max-w-2xl'>
				<h1 className='text-2xl font-bold text-center mb-4'>
					Voice to Text App
				</h1>

				<StripeContext>
				</StripeContext>
			</div>
		</div>
	)
}

export default Home
