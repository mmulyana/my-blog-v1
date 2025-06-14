'use client'

import { ChevronDown } from 'lucide-react'
import { Separator } from '@/shared/components/ui/separator'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { authClient } from '@/shared/lib/auth-client'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/shared/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

export default function UserMenu() {
	const { data, isPending } = authClient.useSession()

	if (isPending) {
		return (
			<div className='flex gap-2 items-center'>
				<Skeleton className='h-10 w-10' />
				<div className='flex flex-col justify-center items-start'>
					<Skeleton className='w-20 h-4 rounded' />
					<Skeleton className='w-28 h-4 mt-1 rounded' />
				</div>
			</div>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10 rounded-full'>
						<AvatarImage
							height={180}
							width={180}
							src={data?.user.image as string}
						/>
						<AvatarFallback>{data?.user.name.at(1)}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col justify-center items-start'>
						<p className='text-gray-900'>{data?.user.name}</p>
						<p className='text-sm text-gray-500'>{data?.user.email}</p>
					</div>
					<ChevronDown size={20} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-[var(--radix-popper-anchor-width)]'
				align='end'
			>
				<DropdownMenuItem>Open profile</DropdownMenuItem>
				<Separator />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
