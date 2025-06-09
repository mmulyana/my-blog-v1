'use client'

import { Button } from '@/shared/components/ui/button'
import { Category } from '../schema'
import { Pencil, Plus } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { create, update } from '../action'
import { toast } from 'sonner'
import { handleFieldErrors } from '@/shared/lib/form'
import FormCategory from './form-category'

export default function ModalCategory({
	data,
	variant = 'default',
}: {
	data?: Category & { id: string }
	variant?: 'default' | 'edit'
}) {
	const [open, setOpen] = useState(false)
	const [isPending, setIsPending] = useState(false)

	const buttonTrigger = {
		default: (
			<Button>
				<Plus size={18} />
				<span className='px-0.5'>Tambah</span>
			</Button>
		),
		edit: (
			<Button variant='outline'>
				<Pencil size={18} />
				<span className='px-0.5'>Edit</span>
			</Button>
		),
	}

	const defaultValues = {
		color: '',
		name: '',
	}

	const form = useForm<Category>({
		defaultValues,
	})

	useEffect(() => {
		if (open && data) {
			form.reset({
				name: data.name,
				color: data.color,
			})
		}

		if (!open) {
			form.reset(defaultValues)
		}
	}, [data, open])

	const onSubmit = async (payload: Category) => {
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
					<DialogTitle>Kategori</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<FormCategory form={form} onSubmit={onSubmit} isPending={isPending} />
			</DialogContent>
		</Dialog>
	)
}
