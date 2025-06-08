import { redirect } from 'next/navigation'
import FormRegister from './form-register'

export default function Page() {
	const isProduction = process.env.NODE_ENV === 'production'

	if (isProduction) {
		return redirect('/admin')
	}

	return <FormRegister />
}
