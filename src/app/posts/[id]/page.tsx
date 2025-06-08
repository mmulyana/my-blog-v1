import { SafeHtmlRenderer } from '@/components/safe-html-renderer'

import { readOne } from '@/features/post/action'
import { redirect } from 'next/navigation'

export default async function DetailPost({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const productId = (await params).id
	const data = await readOne(productId)

	if (!data) {
		return redirect('/')
	}

	return (
		<main className='container mx-auto max-w-3xl p-4 border'>
			<p className='text-xl font-medium'>{data.title}</p>
			<article className='prose dark:prose-invert max-w-full'>
				<SafeHtmlRenderer htmlContent={data?.content} />
			</article>
		</main>
	)
}
