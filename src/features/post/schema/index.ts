import { z } from 'zod'

const FileSchema = z
	.instanceof(File, { message: 'File tidak valid' })
	.refine((file) => file.size > 0, {
		message: 'File tidak boleh kosong',
	})

export const PostSchema = z.object({
	title: z.string().min(1, 'Tidak boleh kosong'),
	content: z.string().min(1, 'Tidak boleh kosong'),
	status: z
		.enum(['PUBLISHED', 'SOFT_PUBLISHED', 'DRAFT', 'HIDDEN'])
		.optional()
		.default('DRAFT'),
	featured: z.boolean().default(false),
	categories: z
		.array(z.string().min(1, 'Category tidak boleh kosong'))
		.default([]),
	imgUrl: z.string().nullable().optional(),
	collectionId: z.string(),
	file: z.union([FileSchema, z.string(), z.null()]).optional(),
})

export const PostUpdateSchema = PostSchema.extend({
	id: z.string().min(1, 'ID tidak boleh kosong'),
})

export type Post = z.infer<typeof PostSchema>
