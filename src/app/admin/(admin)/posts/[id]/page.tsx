import { readOne } from '@/features/post/action'
import FormUpdate from './form-update'

export default async function DetailPost({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const productId = (await params).id
	const data = await readOne(productId)

	if (!data) {
		return <div>Produk tidak ditemukan.</div>
	}

	return (
		<div>
			<FormUpdate data={data} />
		</div>
	)
}
