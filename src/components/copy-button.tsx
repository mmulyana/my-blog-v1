'use client'

import { useState } from 'react'

type props = {
	textToCopy: string
}

export function CopyButton({ textToCopy }: props) {
	const [isCopied, setIsCopied] = useState(false)

	const handleCopy = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(textToCopy).then(() => {
				setIsCopied(true)
				setTimeout(() => setIsCopied(false), 2000)
			})
		} else {
			const textArea = document.createElement('textarea')
			textArea.value = textToCopy
			document.body.appendChild(textArea)
			textArea.select()
			try {
				document.execCommand('copy')
				setIsCopied(true)
				setTimeout(() => setIsCopied(false), 2000)
			} catch (err) {
				console.error('Fallback: Gagal menyalin teks', err)
			}
			document.body.removeChild(textArea)
		}
	}

	return (
		<button
			onClick={handleCopy}
			className='absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-gray-300 transition-colors'
			aria-label='Salin kode'
		>
			{isCopied ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<polyline points='20 6 9 17 4 12'></polyline>
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
					<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
				</svg>
			)}
		</button>
	)
}
