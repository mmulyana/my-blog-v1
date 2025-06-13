'use server'

import { revalidatePath } from 'next/cache'
import { z, ZodError } from 'zod'

import { getSessionOrThrow } from '@/shared/lib/session'
import { messages } from '@/shared/constant/messages'
import { formatError } from '@/shared/utils'
import prisma from '@/shared/lib/prisma'

import { SectionSchema } from '../schema'

export const readAll = async () => {
	const data = await prisma.section.findMany({
		orderBy: { name: 'asc' },
	})

	return {
		data,
	}
}

export async function create(formData: unknown) {
	try {
		const data = SectionSchema.parse(formData)

		await prisma.section.create({
			data,
		})

		revalidatePath('/admin/sections')
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
		const parsed = SectionSchema.extend({ id: z.string() }).parse(formData)

		await prisma.section.update({
			data: {
				...parsed,
			},
			where: {
				id: parsed.id,
			},
		})

		revalidatePath('/admin/sections')
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
