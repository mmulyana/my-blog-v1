import { Loader } from 'lucide-react'
import { Suspense } from 'react'

import { readAll as readAllSections } from '@/features/section/action'
import UserProfile from '@/features/auth/components/user-profile'

import Tabs2 from '@/shared/components/common/tabs-2'
import FeaturedPosts from '@/features/post/components/featured-post'
import { Skeleton } from '@/shared/components/ui/skeleton'

export default async function Layout({ children }: React.PropsWithChildren) {
	const sectionRes = await readAllSections()
	const sections = [{ id: 'all', name: 'All' }, ...sectionRes.data]

	return (
		<div className='py-10 px-4 md:px-8 grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[1fr_640px_1fr] gap-6 max-w-[1440px] mx-auto'>
			<UserProfile />

			<div>
				<Suspense>
					<Tabs2 sections={sections} />
				</Suspense>
				<div className='w-full max-w-full bg-white rounded-b-lg pb-4 rounded-tr-lg'>
					{children}
				</div>
			</div>

			<div className='mt-8 h-fit bg-white rounded-lg col-end-2 md:col-end-3 lg:col-end-4 p-4'>
				<p className='text-gray-900 font-medium'>Featured</p>
				<Suspense
					fallback={
						<div className='space-y-6 mt-4'>
							<div className='space-y-2'>
								<Skeleton className='h-4 w-20 bg-gray-100 rounded' />
								<Skeleton className='h-6 w-40 bg-gray-200 rounded' />
							</div>
							<div className='space-y-2'>
								<Skeleton className='h-4 w-20 bg-gray-100 rounded' />
								<Skeleton className='h-6 w-40 bg-gray-200 rounded' />
							</div>
						</div>
					}
				>
					<FeaturedPosts />
				</Suspense>
			</div>
		</div>
	)
}
