'use server'

import { revalidatePath } from 'next/cache'
import { z, ZodError } from 'zod'

import { getSessionOrThrow } from '@/shared/lib/session'
import { formatError } from '@/shared/utils'
import { Pagination } from '@/shared/types'
import prisma from '@/shared/lib/prisma'

import { CategorySchema } from '../schema'

export const readAll = async () => {
	const data = await prisma.category.findMany({
		orderBy: { createdAt: 'desc' },
	})

	return {
		data,
	}
}
export const readByPagination = async ({ page, limit = 20 }: Pagination) => {
	const skip = (page - 1) * limit

	const [data, total] = await Promise.all([
		prisma.category.findMany({
			skip,
			take: limit,
			orderBy: { createdAt: 'desc' },
		}),
		prisma.category.count(),
	])

	return {
		data,
		pagination: {
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			totalItems: total,
		},
	}
}

export async function create(formData: unknown) {
	try {
		const data = CategorySchema.parse(formData)

		await prisma.category.create({
			data,
		})

		revalidatePath('/admin/categories')
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
export async function update(formData: unknown) {
	try {
		const session = await getSessionOrThrow()
		const parsed = CategorySchema.extend({ id: z.string() }).parse(formData)

		await prisma.category.update({
			data: {
				...parsed,
			},
			where: {
				id: parsed.id,
			},
		})

		revalidatePath('/admin/categories')
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

export const read = async (id: string) => {
	return await prisma.category.findUnique({ where: { id } })
}
