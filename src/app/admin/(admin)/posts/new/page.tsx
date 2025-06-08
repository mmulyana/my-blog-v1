'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'

import { createPost } from '@/features/post/action'
import { Post } from '@/features/post/schema'
import { handleFieldErrors } from '@/lib/form'
import FormPost from '@/features/post/components/form-post'

export default function NewPosts() {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)

	const form = useForm<Post>({
		defaultValues: {
			title: '',
			content: '',
			featured: false,
			status: 'DRAFT',
		},
	})

	const onSubmit = async (data: Post) => {
		setIsPending(true)
		const res = await createPost(data)
		setIsPending(false)

		if (!res.success) {
			toast.error(res.message)

			if (res.errors) {
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
