import { readAll } from '@/features/section/action'
import ModalSection from '@/features/section/components/modal-section'
import { cn } from '@/shared/utils'

export default async function Page() {
	const data = await readAll()
	return (
		<div className='max-w-5xl mx-auto p-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-lg'>Section</h1>
				<ModalSection />
			</div>
			<div className='mt-4 bg-white rounded-lg border border-gray-150'>
				{data.data.map((i, index) => (
					<div
						key={i.id}
						className={cn(
							'justify-between flex items-center pl-3.5 pr-3 py-1.5 leading-none',
							index < data.data.length - 1 && 'border-b border-gray-150'
						)}
					>
						<p>{i.name}</p>
						<ModalSection
							variant='edit'
							data={{
								id: i.id,
								name: i.name,
							}}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
