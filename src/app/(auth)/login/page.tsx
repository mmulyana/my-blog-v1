'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { auth } from '@/shared/lib/auth'
import FormAuth from '@/features/auth/components/form-auth'

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (session) {
		return redirect('/dashboard/posts')
	}

	return <FormAuth variant='login' />
}
