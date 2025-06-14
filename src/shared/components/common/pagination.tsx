'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/shared/utils'
import { Button } from '../ui/button'

type props = {
	totalPages: number
}

export default function Pagination({ totalPages }: props) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const currentPage = Number(searchParams.get('page')) || 1

	const handleSetPage = (newPage: number) => {
		if (newPage < 1 || newPage > totalPages) return

		const currentParams = new URLSearchParams(
			Array.from(searchParams.entries())
		)
		currentParams.set('page', String(newPage))

		const search = currentParams.toString()
		const query = search ? `?${search}` : ''

		router.replace(`${pathname}${query}`)
	}

	const renderPageNumbers = () => {
		const pages = []
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<Button
					variant='outline'
					key={i}
					onClick={() => handleSetPage(i)}
					className={cn(
						'px-3 py-1 mx-1 rounded-md border cursor-pointer',
						currentPage === i
							? 'bg-primary text-white border-primary hover:bg-primary hover:text-white'
							: 'bg-white text-foreground border-gray-200'
					)}
				>
					{i}
				</Button>
			)
		}
		return pages
	}

	const isPrevDisabled = currentPage <= 1
	const isNextDisabled = currentPage >= totalPages

	return (
		<div className='flex items-center justify-center mt-4'>
			<Button
				variant='outline'
				onClick={() => handleSetPage(currentPage - 1)}
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
				variant='outline'
				onClick={() => handleSetPage(currentPage + 1)}
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
