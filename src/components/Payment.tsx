import React from 'react'
import CheckoutForm from './CheckoutForm'

const PaymentModal = ({ onClose }: { onClose: () => void }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-4 rounded shadow-lg'>
				<h2 className='text-xl font-bold mb-4'>Payment Required</h2>
				<p className='mb-4'>
					You have reached the limit of 2 free recordings. Please make a payment
					to continue.
				</p>
				<CheckoutForm />
				<button onClick={onClose} className='mt-4 bg-gray-200 p-2 rounded'>
					Close
				</button>
			</div>
		</div>
	)
}

export default PaymentModal
