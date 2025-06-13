'use client'

import { UseFormReturn } from 'react-hook-form'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { Section } from '../schema'

export default function FormSection({
	form,
	onSubmit,
	isPending,
}: {
	form: UseFormReturn<Section>
	onSubmit: (data: Section) => void
	isPending?: boolean
}) {
	return (
		<></>
	)
}
