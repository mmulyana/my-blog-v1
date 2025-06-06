import { SafeHtmlRenderer } from '@/components/safe-html-renderer'
import { sampleHtmlContent } from '@/data'

export default async function ShowPostPage() {
	const contentFromDatabase = sampleHtmlContent

	return (
		<main className='container mx-auto max-w-3xl py-12 px-4'>
			<article className='prose dark:prose-invert'>
				<SafeHtmlRenderer htmlContent={contentFromDatabase} />
			</article>
		</main>
	)
}
