import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/shared/lib/auth'
import Tabs from '@/shared/components/common/tabs'
import UserMenu from '@/features/auth/components/user-menu'
import { Suspense } from 'react'

export default async function Layout({ children }: React.PropsWithChildren) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		return redirect('/login')
	}

	return (
		<div className='bg-gray-50 min-h-screen'>
			<div className='max-w-5xl mx-auto border-b border-gray-200 flex justify-between items-center  py-1.5'>
				<Tabs />
				<UserMenu />
			</div>
			<div className='max-w-5xl mx-auto'>{children}</div>
		</div>
	)
}
