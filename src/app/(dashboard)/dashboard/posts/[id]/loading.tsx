import { Loader } from 'lucide-react'

export default function Loading() {
	return (
		<div className='min-h-40 w-full flex justify-center items-center'>
			<Loader className='mr-2 h-4 w-4 animate-spin' />
			Loading...
		</div>
	)
}
