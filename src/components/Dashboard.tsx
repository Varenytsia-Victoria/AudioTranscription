'use client'

import React, { useEffect, useState } from 'react'
import IndexPage from './IndexPage'

interface Recording {
	id: string
	name: string
	date: string
}

const Dashboard: React.FC = () => {
	const [recordings, setRecordings] = useState<Recording[]>([])

	useEffect(() => {
		const fetchRecordings = async () => {
			try {
				const response = await fetch('/api/recordings')
				const data = await response.json()
				setRecordings(data)
			} catch (error) {
				console.error('Error fetching recordings:', error)
			}
		}
		fetchRecordings()
	}, [])

	return (
		<div className='flex'>
			<aside className='w-1/4 bg-gray-100 p-4'>
				<h2 className='text-xl font-bold mb-4'>Past Recordings</h2>
				<ul>
					{recordings.map(recording => (
						<li key={recording.id} className='mb-2'>
							<div className='p-2 bg-white rounded shadow'>
								<p className='font-bold'>{recording.name}</p>
								<p className='text-sm text-gray-500'>{recording.date}</p>
							</div>
						</li>
					))}
				</ul>
			</aside>
			<main className='flex-1 p-4'>
				<IndexPage />
			</main>
		</div>
	)
}

export default Dashboard
