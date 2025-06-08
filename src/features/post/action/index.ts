'use server'

import { revalidatePath } from 'next/cache'
import { z, ZodError } from 'zod'

import { getSessionOrThrow } from '@/lib/session'
import { formatError } from '@/lib/utils'
import { Pagination } from '@/types'
import prisma from '@/lib/prisma'

import { PostSchema } from '../schema'

export const readAll = async ({
	page,
	limit,
	createdBy,
}: Pagination & {
	createdBy?: string
}) => {
	const skip = (page - 1) * limit

	const [products, total] = await Promise.all([
		prisma.post.findMany({
			skip,
			take: limit,
			orderBy: { createdAt: 'desc' },
			where: createdBy ? { createdBy } : {},
		}),
		prisma.post.count(),
	])

	return {
		data: products,
		pagination: {
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			totalItems: total,
		},
	}
}

export async function createPost(formData: unknown) {
	try {
		const session = await getSessionOrThrow()
		const parsed = PostSchema.parse(formData)

		await prisma.post.create({
			data: {
				...parsed,
				createdBy: session.user.id,
			},
		})

		revalidatePath('/admin/posts')
		return { success: true, message: 'Berhasil disimpan' }
	} catch (error) {
		if (error instanceof ZodError) {
			const fieldErrors = error.flatten().fieldErrors
			return {
				success: false,
				message: 'Validasi gagal',
				errors: fieldErrors,
			}
		}

		// Error lain
		return { success: false, message: formatError(error) }
	}
}
export async function updatePost(formData: unknown) {
	try {
		const session = await getSessionOrThrow()
		const parsed = PostSchema.extend({ id: z.string() }).parse(formData)

		await prisma.post.update({
			data: {
				...parsed,
			},
			where: {
				id: parsed.id,
			},
		})

		revalidatePath('/admin/posts')
		return { success: true, message: 'Berhasil disimpan' }
	} catch (error) {
		if (error instanceof ZodError) {
			const fieldErrors = error.flatten().fieldErrors
			return {
				success: false,
				message: 'Validasi gagal',
				errors: fieldErrors,
			}
		}

		// Error lain
		return { success: false, message: formatError(error) }
	}
}

export const readOne = async (id: string) => {
	return await prisma.post.findUnique({ where: { id } })
}
