import Link from 'next/link'

import ToggleSwitch from '@/shared/components/common/toggle-switch'
import Pagination from '@/shared/components/common/pagination'
import { buttonVariants } from '@/shared/components/ui/button'
import { getSessionOrThrow } from '@/shared/lib/session'
import { Badge } from '@/shared/components/ui/badge'
import { readAll } from '@/features/post/action'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'
import ToggleFeatured from '@/features/post/components/toggle-feature'
import { ExternalLink, ImageIcon, Pencil } from 'lucide-react'
import Image from 'next/image'

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const session = await getSessionOrThrow()
	const page = Number((await searchParams).page ?? '1')
	const limit = 20

	const { data, pagination } = await readAll({
		page,
		limit,
		createdBy: session.user.id,
	})

	return (
		<div className='max-w-5xl mx-auto space-y-4 mt-4 px-4 md:px-0'>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-medium'>My posts</h1>
				<Link
					href={'/dashboard/posts/new'}
					className={buttonVariants({
						variant: 'default',
						className: 'rounded-md',
					})}
				>
					<Pencil size={18} />
					New
				</Link>
			</div>
			<Table>
				<TableHeader>
					<TableRow className='border-none'>
						<TableHead className='bg-gray-200/50 rounded-l-md px-4'>
							Thumbnail
						</TableHead>
						<TableHead className='bg-gray-200/50'>Name</TableHead>
						<TableHead className='bg-gray-200/50'>Section</TableHead>
						<TableHead className='bg-gray-200/50'>Category</TableHead>
						<TableHead className='bg-gray-200/50'>Featured</TableHead>
						<TableHead className='bg-gray-200/50'>Status</TableHead>
						<TableHead className='bg-gray-200/50 rounded-r-md px-4'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell className='px-4'>
								{item.imgUrl ? (
									<Image
										src={item.imgUrl}
										width={120}
										height={80}
										alt='thumbnail'
										className='rounded-lg h-24 w-32 object-cover object-center'
									/>
								) : (
									<div className='rounded-lg bg-gray-200 w-32 h-24 flex justify-center items-center'>
										<ImageIcon size={24} />
									</div>
								)}
							</TableCell>
							<TableCell>
								<p className='text-foreground text-base text-wrap w-[200px] text-left'>
									{item.title}
								</p>
							</TableCell>
							<TableCell>
								<p className='text-foreground text-base'>
									{item?.collection?.name}
								</p>
							</TableCell>
							<TableCell>
								<div className='flex gap-2 flex-wrap max-w-[320px]'>
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
							</TableCell>
							<TableCell>
								<ToggleFeatured id={item.id} value={item.featured} />
							</TableCell>
							<TableCell>
								<Badge variant='outline' className='rounded-full'>
									{item.status}
								</Badge>
							</TableCell>
							<TableCell>
								<Link
									href={`/dashboard/posts/${item.id}`}
									className={buttonVariants({ variant: 'outline', size: 'sm' })}
								>
									Open
									<ExternalLink />
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination totalPages={pagination.totalPages} />
		</div>
	)
}
