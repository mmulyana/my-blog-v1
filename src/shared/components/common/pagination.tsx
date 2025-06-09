'use client'

import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface PaginationProps {
	page: number
	totalPages: number
}

export default function Pagination({ page, totalPages }: PaginationProps) {
	const router = useRouter()
	const renderPageNumbers = () => {
		const pages = []
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<Link
					key={i}
					href={`?page=${i}`}
					className={cn(
						'px-3 py-1 mx-1 rounded-md border',
						page === i
							? 'bg-primary text-white border-primary'
							: 'bg-white text-foreground border-gray-200'
					)}
				>
					{i}
				</Link>
			)
		}
		return pages
	}

	const isPrevDisabled = page <= 1
	const isNextDisabled = page >= totalPages

	return (
		<div className='flex items-center justify-center mt-4'>
			<Button
				variant='outline'
				onClick={() => router.push(`?page=${page - 1}`)}
				className={cn(
					'px-3 py-1 mx-1 rounded-md',
					isPrevDisabled
						? 'bg-gray-200 text-gray-500 cursor-not-allowed'
						: 'text-foreground  bg-white shadow-none cursor-pointer'
				)}
				disabled={isPrevDisabled}
			>
				Prev
			</Button>
			<div className='flex'>{renderPageNumbers()}</div>
			<Button
				onClick={() => {
					router.push(`?page=${page + 1}`)
				}}
				variant='outline'
				className={cn(
					'px-3 py-1 mx-1 rounded-md',
					isNextDisabled
						? 'bg-gray-200 text-gray-500 cursor-not-allowed'
						: 'text-foreground  bg-white shadow-none cursor-pointer'
				)}
				disabled={isNextDisabled}
			>
				Next
			</Button>
		</div>
	)
}
