import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/nextjs'
import './globals.css'
import Navbar from '@/src/components/Navbar'
import IndexPage from '@/src/components/IndexPage'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<head>
					<title>My App</title>
					<meta charSet='UTF-8' />
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1.0'
					/>
				</head>
				<body>
					<Navbar />
					<SignedOut>
						<SignInButton mode='modal' />
					</SignedOut>
					<SignedIn>
						<UserButton />
						<IndexPage />
					</SignedIn>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
