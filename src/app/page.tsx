import { buttonVariants } from '@/components/ui/button'
import { readAll } from '@/features/post/action'
import { diffForHumans } from '@/lib/utils'
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
		<div className='pt-10 px-4'>
			<div className='w-[640px] max-w-full mx-auto bg-white'>
				{data.map((item) => (
					<div key={item.id} className='flex justify-between items-center p-6'>
						<div>
							<p className='text-foreground/50 text-sm'>{diffForHumans(item.createdAt)}</p>
							<p className='text-lg text-foreground'>{item.title}</p>
						</div>

						<Link href={`/posts/${item.id}`}>Lihat</Link>
					</div>
				))}
			</div>
		</div>
	)
}
