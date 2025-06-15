import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import UserMenu from '@/features/auth/components/user-menu'
import Tabs from '@/shared/components/common/tabs'
import { auth } from '@/shared/lib/auth'

export default async function Layout({ children }: React.PropsWithChildren) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		return redirect('/login')
	}

	const onLogout = async () => {
		'use server'
		await auth.api.signOut({
			headers: await headers(),
		})

		return redirect('/login')
	}

	return (
		<div className='bg-gray-50 min-h-screen'>
			<div className='max-w-5xl mx-auto border-b border-gray-200 flex justify-between items-center px-4 md:px-0 py-1.5'>
				<Tabs />
				<UserMenu user={session.user} onLogout={onLogout} />
			</div>
			<div className='max-w-5xl mx-auto'>{children}</div>
		</div>
	)
}
