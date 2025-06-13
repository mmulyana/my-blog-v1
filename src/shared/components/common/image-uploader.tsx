import { ImagePlus, X } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils'

interface ImageUploadProps {
	value?: File | string | null
	onChange: (file: File | null) => void
	maxSizeMb?: number
	className?: string
}

export default function ImageUploader({
	value,
	onChange,
	maxSizeMb = 5,
	className,
}: ImageUploadProps) {
	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			if (file.size / 1024 / 1024 > maxSizeMb) {
				alert(`Ukuran maksimal ${maxSizeMb}MB`)
				return
			}
			onChange(file)
		}
	}

	const preview =
		value instanceof File
			? URL.createObjectURL(value)
			: typeof value === 'string'
			? value
			: null

	return (
		<div className='flex items-center gap-4'>
			<div
				className={cn(
					'w-full h-48 rounded-lg border border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 relative',
					value && 'border-none',
					className
				)}
			>
				{preview ? (
					<>
						<img
							src={preview}
							alt='Preview'
							className='object-cover w-full h-full'
						/>
						<button
							type='button'
							onClick={() => onChange(null)}
							className='bg-black/50 text-white w-full h-8 absolute bottom-0 left-0 flex items-center justify-center'
						>
							<X size={20} />
						</button>
					</>
				) : (
					<div className='flex flex-col justify-center items-center gap-1'>
						<ImagePlus className='text-ink-light' size={28} />
						<p className='text-gray-400 mb-2 text-sm'>
							<span className='text-red-500'>*</span>maksimal ukuran {maxSizeMb}
							mb
						</p>
						<Button
							type='button'
							onClick={() => inputRef.current?.click()}
							variant='outline'
							className='cursor-pointer hover:bg-gray-100'
						>
							Pilih foto
						</Button>
					</div>
				)}
			</div>
			<input
				type='file'
				accept='image/*'
				ref={inputRef}
				onChange={handleChange}
				className='hidden'
			/>
		</div>
	)
}
