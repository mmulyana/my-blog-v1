'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
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
