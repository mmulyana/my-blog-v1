'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'

import FormPost from '@/features/post/components/form-post'
import { create } from '@/features/post/action'
import { Post } from '@/features/post/schema'

import { handleFieldErrors } from '@/shared/lib/form'
import { uploadImage } from '@/shared/utils'

export default function FormNewPost({
	categories,
	sections,
}: {
	categories?: { id: string; name: string }[]
	sections?: { id: string; name: string }[]
}) {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)

	const form = useForm<Post>({
		defaultValues: {
			title: '',
			content: '',
			featured: false,
			status: 'DRAFT',
			categories: [],
			imgUrl: '',
			file: undefined,
			collectionId: '',
		},
	})

	const onSubmit = async (data: Post) => {
		setIsPending(true)

		if (data.file instanceof File) {
			const uploadedUrl = await uploadImage(data.file)
			data.imgUrl = uploadedUrl
		}

		const res = await create(data)
		setIsPending(false)

		if (!res.success) {
			toast.error(res.message)

			if (res.errors) {
				handleFieldErrors(form, res.errors)
			}
		} else {
			toast.success(res.message)
			router.push(`/dashboard/posts`)
		}
	}

	return (
		<FormPost
			form={form}
			onSubmit={onSubmit}
			isPending={isPending}
			categories={categories}
			sections={sections}
		/>
	)
}
