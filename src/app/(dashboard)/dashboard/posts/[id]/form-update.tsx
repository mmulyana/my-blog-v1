'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'

import FormPost from '@/features/post/components/form-post'
import { update } from '@/features/post/action'
import { Post } from '@/features/post/schema'

import { handleFieldErrors } from '@/shared/lib/form'
import { destroyImage, uploadImage } from '@/shared/utils'
import { PostStatus } from '@prisma/client'

export default function FormUpdate({
	data,
	categories,
	id,
	sections,
}: {
	id?: string
	data?: Omit<Post, 'categories' | 'imageUrl' | 'file'> & {
		id: string
		categories: {
			id: string
			category: { id: string; name: string }
		}[]
		status: PostStatus
	}
	categories?: { id: string; name: string }[]
	sections?: { id: string; name: string }[]
}) {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)

	const form = useForm<Post>({
		defaultValues: {
			title: data?.title,
			content: data?.content,
			featured: data?.featured,
			file: data?.imgUrl as any,
			imgUrl: data?.imgUrl,
			categories: data?.categories?.map((i) => i.category.id),
			collectionId: data?.collectionId,
		},
	})

	const onSubmit = async (payload: Post) => {
		setIsPending(true)
		if (!data?.id) return

		if (!payload.file) {
			if (typeof payload.imgUrl == 'string' && payload.imgUrl !== '')
				await destroyImage(payload.imgUrl)
			payload.imgUrl = ''
		} else if (typeof payload.file == 'string') {
			payload.file = null
		} else if (payload.file instanceof File) {
			if (typeof payload.imgUrl == 'string' && payload.imgUrl !== '')
				await destroyImage(payload.imgUrl)

			const uploadedUrl = await uploadImage(payload.file)
			payload.imgUrl = uploadedUrl
		}

		const res = await update({ ...payload, id: data.id })
		setIsPending(false)

		if (!res.success) {
			toast.error(res.message)
			if (res.errors) {
				handleFieldErrors(form, res.errors)
			}
		} else {
			toast.success(res.message)
			router.replace('/dashboard/posts')
		}
	}

	return (
		<FormPost
			id={id}
			form={form}
			onSubmit={onSubmit}
			isPending={isPending}
			categories={categories}
			sections={sections}
			status={data?.status}
		/>
	)
}
