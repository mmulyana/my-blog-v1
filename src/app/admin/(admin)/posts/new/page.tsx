import { readAll } from '@/features/category/action'
import FormNewPost from './form-new-post'

export default async function Page() {
	const categories = await readAll()

	return (
		<FormNewPost
			categories={
				categories?.data?.map((i) => ({
					id: i.id,
					name: i.name,
				})) || []
			}
		/>
	)
}
