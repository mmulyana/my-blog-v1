import { readAll } from '@/features/post/action'
import Pagination from '@/shared/components/common/pagination'
import { Badge } from '@/shared/components/ui/badge'
import { diffForHumans } from '@/shared/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home(props: {
	searchParams?: Promise<{
		page?: string
	}>
	params?: Promise<{
		section?: string
	}>
}) {
	const searchParams = await props.searchParams
	const page = Number(searchParams?.page) || 1

	const sectionId = (await props.params)?.section

	const { data, pagination } = await readAll({
		page,
		limit: 10,
		sectionId,
	})

	return (
		<>
			{data.length > 0 ? (
				data.map((item) => (
					<div
						key={item.id}
						className='flex justify-between items-center p-6 min-h-32'
					>
						<div>
							<p className='text-foreground/50 text-sm'>
								{diffForHumans(item.createdAt)}
							</p>
							<Link
								href={`/post/${item.id}`}
								className='text-lg text-gray-900 font-medium'
							>
								{item.title}
							</Link>
							<div className='flex gap-2 flex-wrap mt-2'>
								{item.categories.map((i) => (
									<Badge
										key={i.id}
										variant='outline'
										className='text-sm rounded-full'
									>
										<div
											className='h-1.5 w-1.5 rounded-full'
											style={{ backgroundColor: i.category.color || '#ccc' }}
										></div>
										{i.category.name}
									</Badge>
								))}
							</div>
						</div>
						{item.imgUrl && (
							<Image
								src={item.imgUrl}
								width={200}
								height={140}
								alt='thumbnail'
								className='w-[160px] h-[128px] rounded-lg object-cover object-center'
							/>
						)}
					</div>
				))
			) : (
				<div className='min-h-40 flex justify-center items-center'>
					<p className='text-gray-900 max-w-[240px] text-center text-xl'>Looks like the blog is still empty.</p>
				</div>
			)}
			<Pagination totalPages={pagination.totalPages} />
		</>
	)
}
