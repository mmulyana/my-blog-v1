'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/shared/utils'

const tabs = [
	{ name: 'Post', path: '/dashboard/posts' },
	{ name: 'Collection', path: '/dashboard/collections' },
	{ name: 'Category', path: '/dashboard/categories' },
]

export default function Tabs() {
	const router = useRouter()
	const pathname = usePathname()
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const [hoverStyle, setHoverStyle] = useState({})
	const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' })
	const tabRefs = useRef<(HTMLDivElement | null)[]>([])

	const activeIndex = tabs.findIndex((tab) => pathname.startsWith(tab.path))

	useEffect(() => {
		if (hoveredIndex !== null) {
			const hoveredElement = tabRefs.current[hoveredIndex]
			if (hoveredElement) {
				const { offsetLeft, offsetWidth } = hoveredElement
				setHoverStyle({
					left: `${offsetLeft}px`,
					width: `${offsetWidth}px`,
				})
			}
		}
	}, [hoveredIndex])

	useEffect(() => {
		const activeElement = tabRefs.current[activeIndex]
		if (activeElement) {
			const { offsetLeft, offsetWidth } = activeElement
			setActiveStyle({
				left: `${offsetLeft}px`,
				width: `${offsetWidth}px`,
			})
		}
	}, [activeIndex])

	return (
		<div className='flex items-center w-full pt-2 pb-1.5'>
			<div className='relative'>
				<div
					className='absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center'
					style={{
						...hoverStyle,
						opacity: hoveredIndex !== null ? 1 : 0,
					}}
				/>

				<div
					className='absolute bottom-[-12px] h-1 bg-primary dark:bg-white transition-all duration-300 ease-out'
					style={activeStyle}
				/>

				<div className='relative flex space-x-[6px] items-center'>
					{tabs.map((tab, index) => (
						<div
							key={tab.path}
							ref={(el) => {
								tabRefs.current[index] = el
							}}
							className={cn(
								'px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px]',
								index === activeIndex
									? 'text-[#0e0e10] dark:text-white'
									: 'text-[#0e0f1199] dark:text-[#ffffff99]'
							)}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							onClick={() => router.push(tab.path)}
						>
							<div className='text-sm leading-5 whitespace-nowrap flex items-center justify-center h-full'>
								{tab.name}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
