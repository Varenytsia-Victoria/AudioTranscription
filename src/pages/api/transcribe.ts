import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty'
import fs from 'fs'

export const config = { api: { bodyParser: false } }

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST')
		return res.status(405).json({ error: 'Method not allowed' })

	const form = new multiparty.Form()

	form.parse(req, async (err, fields, files) => {
		if (err) return res.status(500).json({ error: 'Error parsing file' })

		const file = files.audio ? files.audio[0] : null
		if (!file) return res.status(400).json({ error: 'No audio file uploaded' })

		const fileBuffer = fs.readFileSync(file.path)

		try {
			const response = await fetch('https://api.deepgram.com/v1/listen', {
				method: 'POST',
				headers: {
					Authorization: `Token ${process.env.DG_API_KEY}`,
					'Content-Type': 'audio/mp3',
				},
				body: fileBuffer,
			})

			const json = await response.json()
			res.status(200).json(json)
		} catch (error) {
			console.error('Error during transcription:', error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	})
}
