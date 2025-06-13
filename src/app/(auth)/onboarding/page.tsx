import { readProfile } from '@/features/auth/action'
import FormOnboarding from '@/features/auth/components/form-onboarding'
import { buttonVariants } from '@/shared/components/ui/button'
import { getSessionOrThrow } from '@/shared/lib/session'
import Link from 'next/link'

export default async function Page() {
	const session = await getSessionOrThrow()
	const userRes = await readProfile(session.user.id)

	const user = {
		bio: userRes?.bio || '',
		name: userRes?.name || '',
	}

	return (
		<div className='w-full max-w-md mx-auto shadow-none p-6 rounded-xl bg-white border border-border'>
			<FormOnboarding user={user} />
			<div className='mt-4 flex justify-end'>
				<Link
					href={'/dashboard/posts'}
					className={buttonVariants({ variant: 'link' })}
				>
					Skip
				</Link>
			</div>
		</div>
	)
}
