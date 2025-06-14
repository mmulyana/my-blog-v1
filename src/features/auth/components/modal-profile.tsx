'use client'

import ButtonSubmit from '@/shared/components/common/button-submit'
import ImageUploader from '@/shared/components/common/image-uploader'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import {
	Dialog,
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
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { destroyImage, uploadImage } from '@/shared/utils'
import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateProfile } from '../action'
import { toast } from 'sonner'

export default function ModalProfile({
	user,
}: {
	user?: {
		id: string
		name: string
		bio?: string
		image?: string
	}
}) {
	const [open, setOpen] = useState(false)
	const [isPending, setIsPending] = useState(false)

	const form = useForm({
		defaultValues: {
			id: user?.id,
			name: user?.name,
			bio: user?.bio,
			file: user?.image as File | null | string,
			image: user?.image,
		},
	})

	const onSubmit = async (payload: any) => {
		setIsPending(true)

		if (!payload.file) {
			if (typeof payload.image == 'string' && payload.image !== '')
				await destroyImage(payload.image)
			payload.image = ''
		} else if (typeof payload.file == 'string') {
			payload.file = null
		} else if (payload.file instanceof File) {
			if (typeof payload.image == 'string' && payload.image !== '')
				await destroyImage(payload.image)

			const uploadedUrl = await uploadImage(payload.file)
			payload.image = uploadedUrl
		}

		const res = await updateProfile(payload)
		setIsPending(false)

		if (!res.success) {
			toast.error(res.message)
		} else {
			toast.success(res.message)
			setOpen(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='absolute top-4 right-4' variant='outline'>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className='px-6 pb-6'>
				<DialogHeader>
					<DialogTitle className='text-center'>Profile</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='file'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Photo</FormLabel>
									<FormControl>
										<ImageUploader
											className='rounded-full h-40 w-40 mx-auto'
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='bio'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea className='bg-white' {...field} />
									</FormControl>
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
