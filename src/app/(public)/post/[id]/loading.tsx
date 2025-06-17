import { Skeleton } from '@/shared/components/ui/skeleton'

export default function Loading() {
	return (
		<div className='container mx-auto max-w-3xl px-4 pt-10 pb-10'>
			<div className='flex flex-col items-center gap-5'>
				<div className='flex flex-col items-center gap-2'>
					<Skeleton className='w-20 h-6 rounded bg-gray-200' />
					<Skeleton className='w-48 h-8 rounded bg-gray-200' />
				</div>
				<Skeleton className='w-full h-48 rounded bg-gray-200' />
				<Skeleton className='w-full h-8 rounded bg-gray-200' />
				<Skeleton className='w-full h-8 rounded bg-gray-200' />
			</div>
		</div>
	)
}
