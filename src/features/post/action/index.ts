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
				title: parsed.title,
				content: parsed.content,
				status: parsed.status,
				featured: parsed.featured,
				createdBy: session.user.id,
				// Membuat relasi PostCategory
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

		return { success: false, message: formatError(error) }
	}
}

const PostUpdateSchema = PostSchema.extend({
	id: z.string().min(1, 'ID tidak boleh kosong'),
})

export async function updatePost(formData: unknown) {
	try {
		const session = await getSessionOrThrow()
		const parsed = PostUpdateSchema.parse(formData)

		await prisma.post.update({
			where: { id: parsed.id },
			data: {
				title: parsed.title,
				content: parsed.content,
				status: parsed.status,
				featured: parsed.featured,
				// Mengatur ulang (replace) relasi categories
				categories: {
					deleteMany: {}, // hapus relasi lama
					create: parsed.categories.map((categoryId) => ({
						category: {
							connect: { id: categoryId },
						},
					})),
				},
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

		return { success: false, message: formatError(error) }
	}
}

export const readOne = async (id: string) => {
	return await prisma.post.findUnique({
		where: { id },
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
