import { z } from 'zod'

export const CategorySchema = z.object({
	name: z.string().min(1, 'Tidak boleh kosong'),
	color: z.string().default('#eb7a34'),
})

export type Category = z.infer<typeof CategorySchema>
