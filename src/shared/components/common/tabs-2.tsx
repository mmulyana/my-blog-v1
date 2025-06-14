'use client'

import { useParams, useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

export default function Tabs2({
	sections,
}: {
	sections: { id: string; name: string }[]
}) {
	const router = useRouter()
	const params = useParams()
	return (
		<Tabs defaultValue={params.section as string} className='max-w-xl'>
			<TabsList className='relative h-auto w-full gap-0.5 bg-transparent p-0 justify-start'>
				{sections.map((i) => (
					<TabsTrigger
						key={i.id}
						value={i.id}
						className='data-[state=active]:bg-white data-[state=inactive]:bg-gray-200/80 overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none max-w-20 h-8'
						onClick={() => {
							if (i.id === 'all') {
								router.replace('/')
								return
							}
							router.replace(`/posts/${i.id}`)
						}}
					>
						{i.name}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}
