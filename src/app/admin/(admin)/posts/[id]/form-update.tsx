'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'

import FormPost from '@/features/post/components/form-post'
import { updatePost } from '@/features/post/action'
import { Post } from '@/features/post/schema'

import { handleFieldErrors } from '@/lib/form'

export default function FormUpdate({ data }: { data?: Post & { id: string } }) {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)

	const form = useForm<Post>({
		defaultValues: {
			title: data?.title,
			content: data?.content,
			featured: data?.featured,
			status: data?.status,
		},
	})

	const onSubmit = async (payload: Post) => {
		setIsPending(true)
		if (!data?.id) return
		const res = await updatePost({ ...payload, id: data.id })
		setIsPending(false)

		if (!res.success) {
			toast.error(res.message)
			if (res.errors) {
				console.log(res.errors)
				handleFieldErrors(form, res.errors)
			}
		} else {
			toast.success(res.message)
			router.push(`/admin/posts`)
		}
	}

	return (
		<div>
			<FormPost form={form} onSubmit={onSubmit} isPending={isPending} />
		</div>
	)
}
