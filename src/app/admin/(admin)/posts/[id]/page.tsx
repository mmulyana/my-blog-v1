import { readAll } from '@/features/category/action'
import { readOne } from '@/features/post/action'
import FormUpdate from './form-update'

export default async function DetailPost({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const productId = (await params).id
	const data = await readOne(productId)
	const categories = await readAll()

	if (!data) {
		return <div>Produk tidak ditemukan.</div>
	}

	return (
		<div>
			<FormUpdate
				data={{
					categories: data.categories.map((i) => ({
						id: i.id,
						category: {
							name: i.category.name,
							id: i.category.id,
						},
					})),
					content: data.content,
					featured: data.featured,
					id: data.id,
					status: data.status,
					title: data.title,
				}}
				categories={
					categories?.data?.map((i) => ({
						id: i.id,
						name: i.name,
					})) || []
				}
			/>
		</div>
	)
}
