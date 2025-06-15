import { Skeleton } from '@/shared/components/ui/skeleton'

export default function Loading() {
	return (
		<div className='space-y-4 p-6'>
			<div className='space-y-2'>
				<Skeleton className='h-4 w-40 rounded bg-gray-100' />
				<Skeleton className='h-6 w-72 rounded bg-gray-200' />
				<Skeleton className='h-6 w-20 rounded-full bg-gray-100' />
			</div>
			<div className='space-y-2'>
				<Skeleton className='h-4 w-40 rounded bg-gray-100' />
				<Skeleton className='h-6 w-72 rounded bg-gray-200' />
				<Skeleton className='h-6 w-20 rounded-full bg-gray-100' />
			</div>
		</div>
	)
}
