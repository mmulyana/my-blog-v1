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

import { Category } from '../schema'

export default function FormCategory({
	form,
	onSubmit,
	isPending,
}: {
	form: UseFormReturn<Category>
	onSubmit: (data: Category) => void
	isPending?: boolean
}) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='color'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Waran</FormLabel>
							<FormControl>
								<Input {...field} type='color' className='block w-10 px-1.5' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<ButtonSubmit isPending={isPending} />
			</form>
		</Form>
	)
}
