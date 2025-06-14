'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, buttonVariants } from '@/shared/components/ui/button'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { handleFieldErrors } from '@/shared/lib/form'
import { Input } from '@/shared/components/ui/input'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { create, update } from '../action/link'
import { Pencil, Plus } from 'lucide-react'
import { cn } from '@/shared/utils'

const typesOptions = [
	'github',
	'linkedin',
	'x',
	'facebook',
	'instagram',
	'website',
	'etc',
]

export default function ModalLink({
	link,
	variant = 'create',
}: {
	link?: {
		id: string
		type: string
		value: string
	}
	variant: 'edit' | 'create'
}) {
	const [open, setOpen] = useState(false)
	const [isPending, setIsPending] = useState(false)

	const form = useForm({
		defaultValues: {
			value: '',
			type: '',
		},
	})

	useEffect(() => {
		if (link) {
			form.reset({
				type: link.type,
				value: link.value,
			})
		}
	}, [link])

	const onSubmit = async (data: any) => {
		setIsPending(true)
		let res = undefined
		if (variant === 'create') {
			res = await create({
				type: data.type,
				value: data.value,
			})
		} else {
			if (!link?.id) {
				toast.error('id is empty')
				return
			}

			res = await update({
				id: link.id,
				type: data.type,
				value: data.value,
			})
		}
		setIsPending(false)

		if (!res?.success) {
			toast.error(res?.message)
			if (res?.errors) {
				handleFieldErrors(form, res.errors)
			}
		} else {
			toast.success(res.message)
			setOpen(false)
			form.reset({
				type: '',
				value: '',
			})
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className={cn(
						variant == 'edit' &&
							'bg-white border-none w-full justify-start rounded h-9 text-gray-900 px-3'
					)}
				>
					{variant === 'create' && <Plus size={18} />}
					{variant === 'edit' ? 'Edit' : 'New Link'}
				</Button>
			</DialogTrigger>
			<DialogContent className='px-6 pb-6'>
				<DialogHeader>
					<DialogTitle className='text-center'>Link</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Type</FormLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger className='w-full bg-white !h-10'>
												<SelectValue placeholder='Select type' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{typesOptions.map((i) => (
												<SelectItem key={i} value={i}>
													{i}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='bg-white h-10' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<div className='flex items-center justify-end gap-2'>
								<DialogClose
									className={buttonVariants({
										variant: 'outline',
									})}
								>
									Cancel
								</DialogClose>
								<ButtonSubmit isPending={isPending} />
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
