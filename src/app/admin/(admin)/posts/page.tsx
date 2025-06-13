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
import { ExternalLink, ImageIcon } from 'lucide-react'
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
		<div className='max-w-5xl mx-auto space-y-4 py-8'>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-medium'>My posts</h1>
				<Link
					href={'/admin/posts/new'}
					className={buttonVariants({
						variant: 'default',
						className: 'rounded-md',
					})}
				>
					New
				</Link>
			</div>
			<Table>
				<TableHeader>
					<TableRow className='border-none'>
						<TableHead className='bg-gray-200/50 rounded-l-md px-4'>
							Thumbnail
						</TableHead>
						<TableHead className='bg-gray-200/50 rounded-l-md px-4'>
							Name
						</TableHead>
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
										className='rounded-lg'
									/>
								) : (
									<div className='rounded-lg bg-gray-200 w-[120px] h-20 flex justify-center items-center'>
										<ImageIcon size={24} />
									</div>
								)}
							</TableCell>
							<TableCell className='px-4'>
								<p className='text-foreground text-base'>{item.title}</p>
							</TableCell>
							<TableCell className=''>
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
							<TableCell className=''>
								<ToggleFeatured id={item.id} value={item.featured} />
							</TableCell>
							<TableCell className=''>
								<Badge variant='outline' className='rounded-full'>
									{item.status}
								</Badge>
							</TableCell>
							<TableCell className=''>
								<Link
									href={`/admin/posts/${item.id}`}
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
			<Pagination page={page} totalPages={pagination.totalPages} />
		</div>
	)
}
