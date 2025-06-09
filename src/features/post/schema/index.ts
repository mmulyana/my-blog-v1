import { z } from 'zod'

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
})

export type Post = z.infer<typeof PostSchema>
