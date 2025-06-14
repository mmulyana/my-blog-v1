import Link from 'next/link'

import { readAll as readAllSections } from '@/features/section/action'
import { readAll as readAllPosts } from '@/features/post/action'
import UserProfile from '@/features/auth/components/user-profile'

import Tabs2 from '@/shared/components/common/tabs-2'
import { Badge } from '@/shared/components/ui/badge'
import { diffForHumans } from '@/shared/utils'
import { ScrollArea } from '@/shared/components/ui/scroll-area'

export default async function Layout({ children }: React.PropsWithChildren) {
	const { data: featureds } = await readAllPosts({
		page: 1,
		limit: 5,
		featured: true,
	})
	const sectionRes = await readAllSections()
	const sections = [{ id: 'all', name: 'All' }, ...sectionRes.data]

	return (
		<div className='pt-10 px-4 md:px-8 grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[1fr_640px_1fr] gap-6 max-w-[1440px] mx-auto'>
			<UserProfile />

			<div>
				<Tabs2 sections={sections} />
				<div className='w-full max-w-full bg-white rounded-b-lg pb-4 rounded-tr-lg'>
					{children}
				</div>
			</div>

			<div className='mt-8 h-80 bg-white rounded-lg col-end-2 md:col-end-3 lg:col-end-4 p-4'>
				<p className='text-gray-900 font-medium'>Featured</p>
				<ScrollArea className='h-[calc(100%-40px)]'>
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
				</ScrollArea>
			</div>
		</div>
	)
}
