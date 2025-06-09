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
						<div className='flex gap-2 flex-wrap'>
							{item.categories.map((i) => (
								<div
									className='rounded-full px-2.5 py-1.5'
									style={{ background: i.category.color || '' }}
									key={i.id}
								>
									{i.category.name}
								</div>
							))}
						</div>
						<Link href={`/admin/posts/${item.id}`}>Lihat</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
