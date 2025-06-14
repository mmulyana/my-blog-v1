import Image from 'next/image'

export const linkIcon: Record<string, React.ReactNode> = {
	github: (
		<Image
			src='/brand-github.svg'
			width={24}
			height={24}
			alt='github'
			className='w-5 h-5'
		/>
	),
	linkedin: (
		<Image
			src='/brand-linkedin.svg'
			height={24}
			width={24}
			alt='linkedin'
			className='w-5 h-5'
		/>
	),
	x: (
		<Image
			src='/brand-x.svg'
			height={24}
			width={24}
			className='w-5 h-5'
			alt='x'
		/>
	),
	facebook: (
		<Image
			src='/brand-facebook.svg'
			height={24}
			width={24}
			className='w-5 h-5'
			alt='facebook'
		/>
	),
	instagram: (
		<Image
			src='/brand-instagram.svg'
			height={24}
			width={24}
			className='w-5 h-5'
			alt='instagram'
		/>
	),
	website: (
		<Image
			src='/world.svg'
			height={24}
			width={24}
			className='w-5 h-5'
			alt='website'
		/>
	),
	etc: (
		<Image
			src='/world.svg'
			height={24}
			width={24}
			className='w-5 h-5'
			alt='etc'
		/>
	),
}
