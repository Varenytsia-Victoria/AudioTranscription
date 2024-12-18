import prisma from '../lib/db'
import { currentUser } from '@clerk/nextjs/server'
import Dashboard from '@/src/components/Dashboard'

export default async function Navbar() {
	const user = await currentUser()

	if (!user) return null

	const loggedUser = await prisma.user.findUnique({
		where: { clerkUserId: user.id },
	})

	if (!loggedUser) {
		await prisma.user.create({
			data: {
				clerkUserId: user.id,
				email: user.emailAddresses[0].emailAddress,
				name: `${user.firstName} ${user.lastName}`,
			},
		})

		const recordingsCount = await prisma.recording.count({
			where: { userId: loggedUser.id },
		})

		return (
			<>
				<h2 className='text-2xl font-bold'>Welcome back, {user.firstName}</h2>
				<Dashboard recordingsCount={recordingsCount} />
			</>
		)
	}
}
