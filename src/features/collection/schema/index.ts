import { z } from 'zod'

export const CollectionSchema = z.object({
	name: z.string().min(1, 'Tidak boleh kosong'),
})

export type Section = z.infer<typeof CollectionSchema>
