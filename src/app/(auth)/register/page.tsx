import { readAuthor } from '@/features/auth/action'
import FormAuth from '@/features/auth/components/form-auth'
import { auth } from '@/shared/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	const author = await readAuthor()
	if (author) {
		return redirect('/')
	}

	if (session) {
		return redirect('/')
	}

	return <FormAuth variant='register' />
}
