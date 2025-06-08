import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { getSessionOrThrow } from '@/lib/session'
import { readAll } from '@/features/post/action'

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const session = await getSessionOrThrow()
	const page = Number((await searchParams).page ?? '1')

	const { data, pagination } = await readAll({
		page,
		limit: 5,
		createdBy: session.user.id,
	})

	return (
		<div className='max-w-5xl mx-auto'>
			{JSON.stringify(pagination)}
			<div className='flex justify-between items-center'>
				<h1>Postingan</h1>
				<Link
					href={'/admin/posts/new'}
					className={buttonVariants({ variant: 'default' })}
				>
					Tambah
				</Link>
			</div>
			<ul>
				{data.map((item) => (
					<li key={item.id} className='flex justify-between items-center'>
						<p>{item.title}</p>
						<Link href={`/admin/posts/${item.id}`}>Lihat</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
