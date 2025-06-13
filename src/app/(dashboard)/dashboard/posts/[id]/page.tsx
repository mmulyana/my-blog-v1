import { read } from '@/features/post/action'
import FormUpdate from './form-update'
import { readAll as readAllCategories } from '@/features/category/action'
import { readAll as readAllSections } from '@/features/section/action'

export default async function DetailPost({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const postId = (await params).id
	const res = await read(postId)
	const categoryRes = await readAllCategories()
	const sectionRes = await readAllSections()

	if (!res) {
		return <div>Produk tidak ditemukan.</div>
	}

	const data = {
		categories: res.categories.map((i) => ({
			id: i.id,
			category: {
				name: i.category.name,
				id: i.category.id,
			},
		})),
		content: res.content,
		featured: res.featured,
		id: res.id,
		status: res.status,
		title: res.title,
		imageUrl: res.imgUrl,
		sectionId: res.sectionId,
	}

	const categories =
		categoryRes?.data?.map((i) => ({
			id: i.id,
			name: i.name,
		})) || []

	const sections =
		sectionRes.data.map((i) => ({
			id: i.id,
			name: i.name,
		})) || []

	return (
		<div>
			<FormUpdate
				data={{
					categories: data.categories,
					content: data.content,
					featured: data.featured,
					id: data.id,
					status: data.status,
					title: data.title,
					imgUrl: data.imageUrl,
					section: data.sectionId || '',
				}}
				categories={categories}
				id={postId}
				sections={sections}
			/>
		</div>
	)
}
