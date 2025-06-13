import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!,
})

function extractPublicId(secureUrl: string) {
	try {
		const url = new URL(secureUrl)
		const parts = url.pathname.split('/')
		const uploadIndex = parts.indexOf('upload')
		if (uploadIndex === -1) return null

		const publicIdParts = parts.slice(uploadIndex + 2)
		const filenameWithExt = publicIdParts.join('/')
		return filenameWithExt.replace(/\.[^/.]+$/, '')
	} catch {
		return null
	}
}

export async function PUT(req: NextRequest) {
	try {
		const body = await req.json()
		const secure_url = body.secure_url

		if (!secure_url) {
			return NextResponse.json({ error: 'Missing secure_url' }, { status: 400 })
		}

		const publicId = extractPublicId(secure_url)
		if (!publicId) {
			return NextResponse.json({ error: 'Invalid secure_url' }, { status: 400 })
		}

		const result = await cloudinary.uploader.destroy(publicId)
		return NextResponse.json(
			{ message: 'Image deleted', result },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Cloudinary delete error:', error)
		return NextResponse.json(
			{ error: 'Failed to delete image' },
			{ status: 500 }
		)
	}
}
