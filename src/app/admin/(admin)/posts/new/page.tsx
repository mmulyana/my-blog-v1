import { readAll } from '@/features/category/action'
import FormNewPost from './form-new-post'

export default async function Page() {
	const res = await readAll()

	const categories =
		res?.data?.map((i) => ({
			id: i.id,
			name: i.name,
		})) || []
		
	return <FormNewPost categories={categories} />
}
