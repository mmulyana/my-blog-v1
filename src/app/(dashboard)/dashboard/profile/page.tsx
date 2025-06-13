import { readProfile } from '@/features/auth/action'
import { getSessionOrThrow } from '@/shared/lib/session'
import Image from 'next/image'

export default async function Page() {
	const session = await getSessionOrThrow()

	const user = await readProfile(session.user.id)

	return (
		<div>
			<Image
				src={user?.image || ''}
				width={120}
				height={120}
				alt=''
				className='rounded-full w-40 h-40'
			/>
			<p>{user?.name}</p>
		</div>
	)
}
