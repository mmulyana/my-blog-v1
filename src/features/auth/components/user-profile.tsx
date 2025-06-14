import Image from 'next/image'
import Link from 'next/link'

import { linkIcon } from '@/shared/constant/link-icon'
import { removeHttp } from '@/shared/utils'

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
			<div>
				<p className='text-gray-900 font-medium'>Links</p>
				<div className='space-y-2.5 mt-4'>
					{data.links.map((i) => (
						<div key={i.id} className='flex justify-between items-center'>
							<Link
								href={i.value}
								target='_blank'
								className='flex gap-2 items-center'
							>
								{linkIcon[i.type]}
								<p>{removeHttp(i.value)}</p>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
