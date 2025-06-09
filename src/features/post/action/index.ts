'use server'

import { revalidatePath } from 'next/cache'
import { z, ZodError } from 'zod'

import { getSessionOrThrow } from '@/shared/lib/session'
import { formatError } from '@/shared/lib/utils'
import { Pagination } from '@/shared/types'
import prisma from '@/shared/lib/prisma'

import { PostSchema, PostUpdateSchema } from '../schema'
import { Prisma } from '@prisma/client'
import { messages } from '@/shared/constant/messages'

export async function readAll({
	page,
	limit,
	createdBy,
}: Pagination & {
	createdBy?: string
}) {
	const skip = (page - 1) * limit

	const where: Prisma.PostWhereInput = {
		AND: [
			createdBy ? { createdBy } : {},
			{
				deletedAt: null,
			},
		],
	}

	const [products, total] = await Promise.all([
		prisma.post.findMany({
			skip,
			take: limit,
			orderBy: { createdAt: 'desc' },
			where,
			select: {
				id: true,
				title: true,
				categories: {
					select: {
						id: true,
						category: {
							select: {
								id: true,
								name: true,
								color: true,
							},
						},
					},
				},
				featured: true,
				createdAt: true,
			},
		}),
		prisma.post.count({ where }),
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

export async function read(id: string) {
	return await prisma.post.findUnique({
		where: { id, deletedAt: null },
		select: {
			id: true,
			title: true,
			content: true,
			featured: true,
			status: true,

			categories: {
				select: {
					id: true,
					category: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
	})
}

export async function create(formData: unknown) {
	try {
		const session = await getSessionOrThrow()
		const parsed = PostSchema.parse(formData)

		await prisma.post.create({
			data: {
				title: parsed.title,
				content: parsed.content,
				status: parsed.status,
				featured: parsed.featured,
				createdBy: session.user.id,
				categories: {
					create: parsed.categories.map((categoryId) => ({
						category: {
							connect: { id: categoryId },
						},
					})),
				},
			},
		})

		revalidatePath('/admin/posts')
		return { success: true, message: messages.success.saved }
	} catch (error) {
		if (error instanceof ZodError) {
			const fieldErrors = error.flatten().fieldErrors
			return {
				success: false,
				message: 'Validasi gagal',
				errors: fieldErrors,
			}
		}

		return { success: false, message: formatError(error) }
	}
}

export async function update(formData: unknown) {
	try {
		await getSessionOrThrow()
		const parsed = PostUpdateSchema.parse(formData)

		await prisma.post.update({
			where: { id: parsed.id },
			data: {
				title: parsed.title,
				content: parsed.content,
				status: parsed.status,
				featured: parsed.featured,
				categories: {
					deleteMany: {},
					create: parsed.categories.map((categoryId) => ({
						category: {
							connect: { id: categoryId },
						},
					})),
				},
			},
		})

		revalidatePath('/admin/posts')
		return { success: true, message: messages.success.updated }
	} catch (error) {
		if (error instanceof ZodError) {
			const fieldErrors = error.flatten().fieldErrors
			return {
				success: false,
				message: 'Validasi gagal',
				errors: fieldErrors,
			}
		}

		return { success: false, message: formatError(error) }
	}
}

export async function destroy(id: string) {
	try {
		await prisma.post.update({ where: { id }, data: { deletedAt: new Date() } })
		revalidatePath('/admin/posts')
		revalidatePath('/')
		return { success: true, message: messages.success.deleted }
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}
