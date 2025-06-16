import { readAll as ReadAllCategories } from '@/features/category/action'
import { readAll as ReadAllSections } from '@/features/collection/action'
import FormNewPost from './form-new-post'

export default async function Page() {
	const categoryRes = await ReadAllCategories()
	const sectionRes = await ReadAllSections()

	const categories =
		categoryRes?.data?.map((i) => ({
			id: i.id,
			name: i.name,
		})) || []

	const sections =
		sectionRes.data.map((i) => ({
			id: i.id,
			name: i.name,
		})) || []

	return <FormNewPost categories={categories} sections={sections} />
}
