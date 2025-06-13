import { z } from 'zod'

export const SectionSchema = z.object({
	name: z.string().min(1, 'Tidak boleh kosong'),
})

export type Section = z.infer<typeof SectionSchema>
