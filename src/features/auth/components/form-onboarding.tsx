'use client'

import ButtonSubmit from '@/shared/components/common/button-submit'
import ImageUploader from '@/shared/components/common/image-uploader'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'
import { Textarea } from '@/shared/components/ui/textarea'
import { uploadImage } from '@/shared/utils'
import { User } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateProfile } from '../action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function FormOnboarding({
	user,
}: {
	user: {
		name: string
		bio?: string
	}
}) {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)

	const form = useForm({
		defaultValues: {
			name: user.name,
			bio: user.bio || '',
			file: null as File | null,
		},
	})

	const onSubmit = async (data: any) => {
		setIsPending(true)

		if (data.file instanceof File) {
			const uploadedUrl = await uploadImage(data.file)
			data.image = uploadedUrl
		}
		console.log('data', data)

		const res = await updateProfile(data)
		setIsPending(false)

		if (!res.success) {
			toast.error(res.message)
		} else {
			toast.success(res.message)
			router.push('dashboard/posts')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem className='flex flex-col items-center'>
							<FormLabel>Photo</FormLabel>
							<FormControl>
								<ImageUploader
									value={field.value}
									onChange={field.onChange}
									className='rounded-full h-40 w-40'
								/>
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
								<Textarea {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<ButtonSubmit isPending={isPending} />
			</form>
		</Form>
	)
}
