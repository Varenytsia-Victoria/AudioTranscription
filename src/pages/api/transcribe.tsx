import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from 'multiparty'
import fs from 'fs'

export const config = {
	api: {
		bodyParser: false,
	},
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' })
	}

	const form = new multiparty.Form()

	interface Fields {
		[key: string]: string[] | undefined
	}

	interface Files {
		[key: string]: Array<{
			fieldName: string
			originalFilename: string
			path: string
			headers: { [key: string]: string }
			size: number
		}> | undefined
	}

	form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
		if (err) {
			console.error('Error parsing file:', err)
			return res.status(500).json({ error: 'Error parsing file' })
		}

		if (!files.audio) {
			return res.status(400).json({ error: 'No audio file uploaded' })
		}
		const file = files.audio[0]
		const fileBuffer = fs.readFileSync(file.path)

		try {
			const response = await fetch('https://api.deepgram.com/v1/listen', {
				method: 'POST',
				headers: {
					Authorization: `Token ${process.env.DG_API_KEY}`,
					'Content-Type': 'audio/mp3', // Change according to the file format
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
