import ModalCategory from '@/features/category/components/modal-category'
import { readByPagination } from '@/features/category/action'

export default async function CategoriesPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const page = Number((await searchParams).page ?? '1')

	const { data, pagination } = await readByPagination({
		page,
		limit: 5,
	})

	return (
		<div className='max-w-5xl mx-auto p-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-lg'>Kategori</h1>
				<ModalCategory />
			</div>
			<div className='space-y-2 mt-4'>
				{data.map((item) => {
					const category = {
						id: item.id,
						name: item.name,
						color: item.color || '',
					}
					return (
						<div key={item.id} className='flex justify-between items-center'>
							<p>{item.name}</p>
							<ModalCategory data={category} variant='edit' />
						</div>
					)
				})}
			</div>
		</div>
	)
}
