'use client'

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'

const CheckoutForm = () => {
	const stripe = useStripe()
	const elements = useElements()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [clientSecret, setClientSecret] = useState<string | null>(null)

	useEffect(() => {
		fetch('/api/create-payment-intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		})
			.then(res => res.json())
			.then(data => setClientSecret(data.client_secret))
	}, [])

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)

		if (!stripe || !elements || !clientSecret) return

		const cardElement = elements.getElement(CardElement)
		if (!cardElement) return

		const { error } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: { card: cardElement },
		})

		if (error) {
			setError(error.message || 'An error occurred')
		} else {
			// Handle successful payment (optional)
		}
		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			{error && <div>{error}</div>}
			<button type='submit' disabled={!stripe || loading}>
				{loading ? 'Processing...' : 'Pay'}
			</button>
		</form>
	)
}

export default CheckoutForm
