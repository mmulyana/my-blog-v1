'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { auth } from '@/shared/lib/auth'
import FormLogin from './form-login'

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (session) {
		return redirect('/admin/posts')
	}

	return <FormLogin />
}
