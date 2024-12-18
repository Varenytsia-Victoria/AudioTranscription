'use client'

import { useState } from 'react'
import PaymentModal from './Payment'

const IndexPage = ({ recordingsCount }: { recordingsCount: number }) => {
	const [file, setFile] = useState<File | null>(null)
	const [lines, setLines] = useState<string[]>([])
	const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)

	const transcribe = async () => {
		if (!file) return alert('Please upload a file')

		if (recordingsCount >= 2) {
			setShowPaymentModal(true)
			return
		}

		const formData = new FormData()
		formData.append('audio', file)

		try {
			const response = await fetch('/api/transcribe', {
				method: 'POST',
				body: formData,
			})
			const data = await response.json()
			const transcript = data.results.channels[0].alternatives[0].transcript
			setLines(transcript.split('. '))
		} catch (error) {
			console.error('Error during transcription:', error)
		}
	}

	return (
		<div>
			<input
				type='file'
				name='audio'
				accept='audio/*'
				onChange={e => e.target.files && setFile(e.target.files[0])}
			/>
			<button type='button' onClick={transcribe}>
				Transcribe
			</button>
			{lines.length > 0 && (
				<div>
					{lines.map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</div>
			)}
			{showPaymentModal && (
				<PaymentModal onClose={() => setShowPaymentModal(false)} />
			)}
		</div>
	)
}

export default IndexPage
