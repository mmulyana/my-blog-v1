'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { Button } from '../ui/button'

type props = {
	path?: string
}

export default function ButtonBack({ path = '/' }: props) {
	const router = useRouter()

	const onBack = useCallback(() => {
		if (window.history.length > 1) {
			router.back()
		} else {
			router.push(path)
		}
	}, [router, path])

	return (
		<Button
			type='button'
			onClick={onBack}
			variant='secondary'
			className='bg-gray-200 hover:bg-gray-300 flex items-center gap-1'
		>
			<ChevronLeft className='size-4' />
			Back
		</Button>
	)
}
