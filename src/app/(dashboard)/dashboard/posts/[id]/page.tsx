import { read } from '@/features/post/action'
import FormUpdate from './form-update'
import { readAll as readAllCategories } from '@/features/category/action'
import { readAll as readAllSections } from '@/features/collection/action'

interface DetailPostProps {
	params: Promise<{ id: string }>
}

export default async function DetailPost({ params }: DetailPostProps) {
	const { id: postId } = await params

	const [post, categoryRes, sectionRes] = await Promise.all([
		read(postId),
		readAllCategories(),
		readAllSections(),
	])

	if (!post) {
		return <div>Post not found</div>
	}

	const formattedPost = {
		id: post.id,
		title: post.title,
		content: post.content,
		featured: post.featured,
		status: post.status,
		imgUrl: post.imgUrl,
		collectionId: post.collectionId || '',
		categories: post.categories.map((item) => ({
			id: item.id,
			category: {
				id: item.category.id,
				name: item.category.name,
			},
		})),
	}

	const categories =
		categoryRes?.data?.map((item) => ({
			id: item.id,
			name: item.name,
		})) || []

	const sections =
		sectionRes?.data?.map((item) => ({
			id: item.id,
			name: item.name,
		})) || []

	return (
		<FormUpdate
			id={postId}
			categories={categories}
			sections={sections}
			data={formattedPost}
		/>
	)
}
