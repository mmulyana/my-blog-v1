import { Check, ChevronDown } from 'lucide-react'
import { PostStatus } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Separator } from '@/shared/components/ui/separator'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

import { publish } from '../action'

export default function AlertPublishPost({
	id,
	status,
}: {
	id?: string
	status?: PostStatus
}) {
	const router = useRouter()

	const onDestroy = async (status: PostStatus) => {
		if (!id) {
			return toast.error('Id is empty')
		}
		const res = await publish(id, status)
		if (!res.success) {
			toast.error(res.message)
		} else {
			toast.success(res.message)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex gap-2 items-center border rounded-lg px-2 pl-3'>
				<p className='text-gray-800 text-sm !capitalize'>
					<span className='opacity-50'>Status:</span>{' '}
					{status?.toLocaleLowerCase().split('_').join(' ')}
				</p>
				<Separator orientation='vertical' />
				<ChevronDown size={18} strokeWidth={3} className='text-gray-500' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => onDestroy('DRAFT')}>
					Draft{' '}
					{status === 'DRAFT' && (
						<Check className='ml-auto text-primary' size={18} />
					)}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onDestroy('PUBLISHED')}>
					Publish{' '}
					{status === 'PUBLISHED' && (
						<Check className='ml-auto text-primary' size={18} />
					)}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onDestroy('SOFT_PUBLISHED')}>
					Soft Publish{' '}
					{status === 'SOFT_PUBLISHED' && (
						<Check className='ml-auto text-primary' size={18} />
					)}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onDestroy('HIDDEN')}>
					Hidden{' '}
					{status === 'HIDDEN' && (
						<Check className='ml-auto text-primary' size={18} />
					)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
