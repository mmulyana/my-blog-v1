import { authClient } from '@/shared/lib/auth-client'
import Image from 'next/image'
import { readAuthor } from '../action'

export default async function UserProfile() {
	const data = await readAuthor()

	return (
		<div className='flex flex-col gap-6'>
			{data.image && (
				<Image
					src={data.image}
					width={104}
					height={104}
					alt='profile'
					className='w-28 h-28 rounded-full object-cover object-center'
				/>
			)}
			<div>
				<p className='text-gray-900 text-lg font-medium'>{data.name}</p>
				<p className='text-gray-500'>{data?.bio}</p>
			</div>
		</div>
	)
}
