import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { PropsWithChildren } from 'react'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const StripeContext = ({ children }: PropsWithChildren<object>) => (
	<Elements stripe={stripePromise}>{children}</Elements>
)

export default StripeContext
