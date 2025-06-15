import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ModalProfile from '@/features/auth/components/modal-profile'
import LinkDropdown from '@/features/auth/components/link-dropdown'
import ButtonBack from '@/shared/components/common/button-back'
import ModalLink from '@/features/auth/components/modal-link'

import { linkIcon } from '@/shared/constant/link-icon'
import { readAuthor } from '@/features/auth/action'
import { removeHttp } from '@/shared/utils'
import { auth } from '@/shared/lib/auth'
import { headers } from 'next/headers'

export default async function Page() {
	const session = await auth.api.getSession({ headers: await headers() })
	const user = await readAuthor()
	return (
		<div className='mt-4 w-full max-w-md mx-auto space-y-6'>
			<ButtonBack path='/' />
			<div className='p-4 rounded-xl bg-white border border-border mt-12 relative'>
				{user.image ? (
					<Image
						src={user?.image || ''}
						width={120}
						height={120}
						alt=''
						className='rounded-full w-28 h-28 mx-auto -mt-10 object-cover object-center'
					/>
				) : (
					<div className='bg-gray-200 rounded-full w-28 h-28 mx-auto -mt-10 flex justify-center items-center'>
						<ImageIcon />
					</div>
				)}
				<p className='text-center text-xl font-medium text-gray-900 mt-4'>
					{user?.name}
				</p>
				<p className='text-center text-gray-500'>{user?.bio}</p>
				{session?.session && (
					<ModalProfile
						user={{
							id: user.id,
							name: user.name,
							bio: user.bio || '',
							image: user.image || '',
						}}
					/>
				)}
			</div>
			<div className='bg-white p-4 rounded-lg border border-border'>
				<div className='flex justify-between items-center'>
					<p className='text-gray-900 font-medium'>Links</p>
					{session?.session && <ModalLink variant='create' />}
				</div>
				<div className='space-y-4 mt-4'>
					{user.links.map((i) => (
						<div key={i.id} className='flex justify-between items-center'>
							<Link
								href={i.value}
								target='_blank'
								className='flex gap-2 items-center'
							>
								{linkIcon[i.type]}
								<p>{removeHttp(i.value)}</p>
							</Link>
							{session?.session && <LinkDropdown link={i} />}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
