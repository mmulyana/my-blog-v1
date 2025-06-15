import { SafeHtmlRenderer } from '@/shared/components/common/safe-html-renderer'
import { read, readAll } from '@/features/post/action'
import { redirect } from 'next/navigation'
import ButtonBack from '@/shared/components/common/button-back'
import Image from 'next/image'
import { diffForHumans } from '@/shared/utils'
import { Badge } from '@/shared/components/ui/badge'
import { ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default async function DetailPost({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const productId = (await params).id
	const data = await read(productId)

	if (!data) {
		return redirect('/')
	}

	const relatedPost = await readAll({
		limit: 3,
		page: 1,
		categoryIds: data.categories.map((i) => i.category.id),
		status: ['PUBLISHED', 'SOFT_PUBLISHED'],
	})

	return (
		<main className='container mx-auto max-w-3xl px-4 pt-10 pb-10'>
			<ButtonBack path='/' />
			<p className='text-gray-500 text-center text-sm mb-2'>
				{diffForHumans(data.createdAt)}
			</p>
			<p className='text-3xl font-medium text-center mb-2'>{data.title}</p>
			<div className='flex justify-center gap-2 max-w-md mx-auto mb-4'>
				{data.categories.map((i) => (
					<Badge key={i.id} variant='outline' className='text-sm rounded-full'>
						<div
							className='h-1.5 w-1.5 rounded-full'
							style={{ backgroundColor: i.category.color || '#ccc' }}
						></div>
						{i.category.name}
					</Badge>
				))}
			</div>
			{data?.imgUrl && (
				<Image
					src={data.imgUrl}
					alt='thumbnail'
					height={400}
					width={800}
					className='w-full h-auto rounded-xl object-contain object-center'
				/>
			)}
			<div className='mt-4 max-w-xl mx-auto prose'>
				<SafeHtmlRenderer htmlContent={data?.content} />
			</div>
			<div className='mt-10 grid grid-cols-2 lg:grid-cols-3 gap-6'>
				{relatedPost.data.map((i) => (
					<Link key={i.id} href={`/post/${i.id}`}>
						{i.imgUrl ? (
							<Image
								width={320}
								height={280}
								alt='thumbnail'
								src={i.imgUrl}
								className='w-full h-36 rounded-xl object-cover'
							/>
						) : (
							<div className='w-full h-36 bg-gray-200 rounded-xl flex justify-center items-center object-cover object-center'>
								<ImageIcon size={24} />
							</div>
						)}
						<p className='text-gray-500 mt-2 text-sm mb-1'>
							{diffForHumans(data.createdAt)}
						</p>
						<p className='text-lg text-gray-900 font-medium'>{i.title}</p>
					</Link>
				))}
			</div>
		</main>
	)
}
