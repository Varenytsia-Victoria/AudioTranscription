'use client'

import { useState } from 'react'

const IndexPage = () => {
	const [file, setFile] = useState<File | null>(null)
	const [lines, setLines] = useState<string[]>([])

	const transcribe = async () => {
		if (!file) {
			alert('Please upload a file')
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
      console.log('API Response:', data)
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
				onChange={e => {
					if (e.target.files) {
						setFile(e.target.files[0])
					}
				}}
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
		</div>
	)
}

export default IndexPage
