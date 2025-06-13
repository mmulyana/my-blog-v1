import ModalCategory from '@/features/category/components/modal-category'
import { readByPagination } from '@/features/category/action'
import Pagination from '@/shared/components/common/pagination'
import { cn } from '@/shared/utils'

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
		<div className='max-w-5xl mx-auto mt-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-medium'>Category</h1>
				<ModalCategory />
			</div>
			<div className='mt-4 bg-white rounded-lg border border-gray-150'>
				{data.map((item, index) => {
					const category = {
						id: item.id,
						name: item.name,
						color: item.color || '',
					}
					return (
						<div
							key={item.id}
							className={cn(
								'justify-between flex items-center pl-3.5 pr-3 py-1.5 leading-none',
								index < data.length - 1 && 'border-b border-gray-150'
							)}
						>
							<div className='flex gap-2 items-center'>
								<div
									className='h-2 w-2 rounded-full'
									style={{ background: item.color || ''}}
								></div>
								<p>{item.name}</p>
							</div>
							<ModalCategory data={category} variant='edit' />
						</div>
					)
				})}
			</div>
			<Pagination page={page} totalPages={pagination.totalPages} />
		</div>
	)
}
