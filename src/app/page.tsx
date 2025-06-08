import { buttonVariants } from '@/components/ui/button'
import { readAll } from '@/features/post/action'
import Link from 'next/link'

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const page = Number((await searchParams).page ?? '1')

	const { data, pagination } = await readAll({
		page,
		limit: 5,
	})
	return (
		<div className='max-w-4xl x-auto space-y-5'>
			<Link
				href={'/admin'}
				className={buttonVariants({
					className: 'rounded-full',
					variant: 'outline',
				})}
			>
				Admin
			</Link>
			<ul>
				{data.map((item) => (
					<li key={item.id} className='flex justify-between items-center'>
						<p>{item.title}</p>
						<Link href={`/posts/${item.id}`}>Lihat</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
