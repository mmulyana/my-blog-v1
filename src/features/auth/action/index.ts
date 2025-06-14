'use server'

import prisma from '@/shared/lib/prisma'
import { getSessionOrThrow } from '@/shared/lib/session'
import { messages } from '@/shared/constant/messages'
import { formatError } from '@/shared/utils'
import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod'

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

		revalidatePath('/')
		revalidatePath('/profile')
		revalidatePath('/dashboard/posts')

		return { success: true, message: messages.success.updated }
	} catch (error) {
		if (error instanceof ZodError) {
			const fieldErrors = error.flatten().fieldErrors
			return {
				success: false,
				message: messages.error.general,
				errors: fieldErrors,
			}
		}

		return { success: false, message: formatError(error) }
	}
}

export async function readAuthor() {
	const data = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			bio: true,
			image: true,
			links: {
				select: {
					id: true,
					type: true,
					value: true,
				},
			},
		},
	})
	return data[0]
}
