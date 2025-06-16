'use client'

import { Pencil, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import ButtonSubmit from '@/shared/components/common/button-submit'
import { Button } from '@/shared/components/ui/button'
import { handleFieldErrors } from '@/shared/lib/form'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import { create, update } from '../action'
import { Section } from '../schema'

export default function ModalCollection({
	data,
	variant = 'default',
}: {
	data?: Section & { id: string }
	variant?: 'default' | 'edit'
}) {
	const [open, setOpen] = useState(false)
	const [isPending, setIsPending] = useState(false)

	const buttonTrigger = {
		default: (
			<Button>
				<Plus size={18} />
				<span>New</span>
			</Button>
		),
		edit: (
			<Button variant='outline'>
				<Pencil size={18} />
				<span>Edit</span>
			</Button>
		),
	}

	const defaultValues = {
		color: '',
		name: '',
	}

	const form = useForm<Section>({
		defaultValues,
	})

	useEffect(() => {
		if (open && data) {
			form.reset({
				name: data.name,
			})
		}

		if (!open) {
			form.reset(defaultValues)
		}
	}, [data, open])

	const onSubmit = async (payload: Section) => {
		setIsPending(true)
		let res = undefined
		if (variant === 'default') {
			res = await create(payload)
		} else {
			res = await update({ ...payload, id: data?.id })
		}
		setIsPending(false)

		if (!res.success) {
			toast.error(res.message)

			if (res.errors) {
				handleFieldErrors(form, res.errors)
			}
		} else {
			toast.success(res.message)
			setOpen(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{buttonTrigger[variant]}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Section</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
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

						<ButtonSubmit isPending={isPending} />
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
