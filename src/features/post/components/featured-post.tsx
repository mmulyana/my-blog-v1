import Link from 'next/link'

import { readAll as readAllPosts } from '@/features/post/action'
import { Badge } from '@/shared/components/ui/badge'
import { diffForHumans } from '@/shared/utils'

function delay(ms: number) {
	return new Promise((res) => setTimeout(res, ms))
}

export default async function FeaturedPosts() {
	await delay(500)

	const { data: featureds } = await readAllPosts({
		page: 1,
		limit: 5,
		featured: true,
	})

	return (
		<div className='mt-4 space-y-4'>
			{featureds.map((item) => (
				<div key={item.id}>
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
			))}
		</div>
	)
}
