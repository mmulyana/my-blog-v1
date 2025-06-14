'use server'

import prisma from '@/shared/lib/prisma'
import { getSessionOrThrow } from '@/shared/lib/session'
import { messages } from '@/shared/constant/messages'
import { formatError } from '@/shared/utils'

export async function checkProfile() {
	const data = await prisma.user.findMany()

	return data.length > 0
}

export const readProfile = async (id: string) => {
	return await prisma.user.findUnique({ where: { id } })
}

export async function updateProfile(data: any) {
	try {
		const session = await getSessionOrThrow()

		await prisma.user.update({
			data: {
				bio: data.bio,
				image: data.image,
			},
			where: {
				id: session.user.id,
			},
		})

		return { success: true, message: messages.success.updated }
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

export async function readAuthor() {
	const data = await prisma.user.findMany()
	return data[0]
}
