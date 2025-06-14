import { z } from 'zod'

export const LinkSchema = z.object({
	value: z.string().min(1),
	type: z.string().min(1),
})
