'use server'

import { revalidatePath } from 'next/cache'
import { Link } from '@prisma/client'
import { ZodError } from 'zod'

import { getSessionOrThrow } from '@/shared/lib/session'
import { messages } from '@/shared/constant/messages'
import { formatError } from '@/shared/utils'
import prisma from '@/shared/lib/prisma'

import { LinkSchema } from '../schema'

export async function create(data: Partial<Link>) {
	try {
		const session = await getSessionOrThrow()

		const { type, value } = LinkSchema.parse(data)

		await prisma.link.create({
			data: {
				type,
				value,
				userId: session.user.id,
			},
		})
		revalidatePath('/')
		revalidatePath('/profile')

		return { success: true, message: messages.success.saved }
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
export async function update(data: Partial<Link>) {
	try {
		const session = await getSessionOrThrow()

		const { type, value } = LinkSchema.parse(data)

		await prisma.link.update({
			data: {
				type,
				value,
				userId: session.user.id,
			},
			where: {
				id: data.id,
			},
		})
		revalidatePath('/')
		revalidatePath('/profile')

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

export async function destroy(id: string) {
	try {
		await getSessionOrThrow()

		await prisma.link.delete({
			where: { id },
		})
		revalidatePath('/')
		revalidatePath('/profile')

		return { success: true, message: messages.success.deleted }
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}
