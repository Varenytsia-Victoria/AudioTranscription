// filepath: /c:/Users/Вікторія/Desktop/web/test/voice-to-text-saas/src/pages/api/create-payment-intent.ts
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2024-11-20.acacia',
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: 1000, // amount in cents
				currency: 'usd',
			})

			res.status(200).json(paymentIntent)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
