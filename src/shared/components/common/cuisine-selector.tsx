import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/shared/utils'

export type CuisineSelectorItem = {
	id: string
	name: string
}

type CuisineSelectorProps = {
	data: CuisineSelectorItem[]
	value?: string[]
	onChange?: (val: string[]) => void
}

export default function CuisineSelector({
	data,
	value,
	onChange,
}: CuisineSelectorProps) {
	const [internalValue, setInternalValue] = useState<string[]>(value || [])

	const selected = value !== undefined ? value : internalValue

	const toggleCuisine = (cuisine: string) => {
		let newValue: string[]
		if (selected.includes(cuisine)) {
			newValue = selected.filter((c) => c !== cuisine)
		} else {
			newValue = [...selected, cuisine]
		}
		if (value === undefined) setInternalValue(newValue)
		onChange?.(newValue)
	}

	return (
		<motion.div
			className='flex flex-wrap gap-3 overflow-visible'
			layout
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30,
				mass: 0.5,
			}}
		>
			{data.map((cuisine) => {
				const isSelected = selected.includes(cuisine.id)
				return (
					<motion.button
						type='button'
						key={cuisine.id}
						onClick={() => toggleCuisine(cuisine.id)}
						layout
						initial={false}
						animate={{
							backgroundColor: isSelected ? '#e05d38' : '#fff',
						}}
						transition={{
							type: 'spring',
							stiffness: 500,
							damping: 30,
							mass: 0.5,
							backgroundColor: { duration: 0.1 },
						}}
						className={cn(
							'inline-flex items-center pl-3 pr-2.5 py-1.5 rounded-full text-base font-medium whitespace-nowrap overflow-hidden border-2 hover:scale-[1.04]',
							isSelected
								? 'text-white border-primary'
								: 'text-foreground/80 border-border'
						)}
					>
						<motion.div
							className='relative flex items-center'
							animate={{
								width: isSelected ? 'auto' : '100%',
								paddingRight: isSelected ? '1.5rem' : '0',
							}}
							transition={{
								ease: [0.175, 0.885, 0.32, 1.275],
								duration: 0.3,
							}}
						>
							<span>{cuisine.name}</span>
							<AnimatePresence>
								{isSelected && (
									<motion.span
										initial={{ scale: 0, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										exit={{ scale: 0, opacity: 0 }}
										transition={{
											type: 'spring',
											stiffness: 500,
											damping: 30,
											mass: 0.5,
										}}
										className='absolute right-0'
									>
										<div className='w-5 h-5 rounded-full bg-white flex items-center justify-center'>
											<Check
												className='w-3 h-3 text-primary'
												strokeWidth={2.5}
											/>
										</div>
									</motion.span>
								)}
							</AnimatePresence>
						</motion.div>
					</motion.button>
				)
			})}
		</motion.div>
	)
}
