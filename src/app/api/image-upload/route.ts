import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	api_key: process.env.CLOUDINARY_API_KEY,
})

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const file = formData.get('file') as File | null

		if (!file) {
			return NextResponse.json({
				message: 'File not found',
			})
		}

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const result = await new Promise<any>((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{ folder: 'blog' },
				(error, result) => {
					if (error) reject(error)
					else resolve(result)
				}
			)
			uploadStream.end(buffer)
		})

		return NextResponse.json({
			message: 'image uploaded',
			url: result.secure_url,
			statusCode: 200,
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json({
			message: 'Error in file upload route',
			statusCode: 500,
		})
	}
}
