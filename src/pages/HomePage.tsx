import prisma from '../lib/db'
//import './globals.css'
import { currentUser } from '@clerk/nextjs/server'
import Dashboard from '@/src/components/Dashboard'

export default async function HomePage() {
	const user = await currentUser()

	if (!user) {
		return null
	}

	const loggedUser = await prisma.user.findUnique({
		where: {
			clerkUserId: user.id,
		},
	})

	if (!loggedUser) {
		try {
			console.log('Creating new user...')
			await prisma.user.create({
				data: {
					clerkUserId: user.id,
					email: user.emailAddresses[0].emailAddress,
					name: `${user.firstName} ${user.lastName}`,
				},
			})
			console.log('User created successfully')
		} catch (error) {
			console.error('Error creating user:', error)
		}
	}

	return (
		<div>
			<Dashboard/>

			<h1>Welcome, {user.firstName}!</h1>
		</div>
	)
}
