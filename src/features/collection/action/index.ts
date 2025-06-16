'use server'

import { revalidatePath } from 'next/cache'
import { z, ZodError } from 'zod'

import { getSessionOrThrow } from '@/shared/lib/session'
import { messages } from '@/shared/constant/messages'
import { formatError } from '@/shared/utils'
import prisma from '@/shared/lib/prisma'

import { CollectionSchema } from '../schema'

export const readAll = async () => {
	const data = await prisma.collection.findMany({
		orderBy: { name: 'asc' },
	})

	return {
		data,
	}
}

export async function create(formData: unknown) {
	try {
		const data = CollectionSchema.parse(formData)

		await prisma.collection.create({
			data,
		})

		revalidatePath('/dashboard/collections')
		revalidatePath('/')
		return { success: true, message: messages.success.saved }
	} catch (error) {
		if (error instanceof ZodError) {
			const fieldErrors = error.flatten().fieldErrors
			return {
				success: false,
				message: messages.validation.general,
				errors: fieldErrors,
			}
		}

		return { success: false, message: formatError(error) }
	}
}
export async function update(formData: unknown) {
	try {
		await getSessionOrThrow()
		const parsed = CollectionSchema.extend({ id: z.string() }).parse(formData)

		await prisma.collection.update({
			data: {
				...parsed,
			},
			where: {
				id: parsed.id,
			},
		})

		revalidatePath('/dashboard/collections')
		revalidatePath('/')
		return { success: true, message: messages.success.updated }
	} catch (error) {
		if (error instanceof ZodError) {
			const fieldErrors = error.flatten().fieldErrors
			return {
				success: false,
				message: messages.validation.general,
				errors: fieldErrors,
			}
		}

		return { success: false, message: formatError(error) }
	}
}
