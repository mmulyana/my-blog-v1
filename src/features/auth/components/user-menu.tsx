'use client'

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Separator } from '@/shared/components/ui/separator'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { authClient } from '@/shared/lib/auth-client'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { ChevronDown } from 'lucide-react'

export default function UserMenu() {
	const { data, isPending, error, refetch } = authClient.useSession()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex gap-2 items-center'>
					{isPending ? (
						<Skeleton className='h-10 w-10' />
					) : (
						<Avatar className='h-10 w-10 rounded-full'>
							<AvatarImage
								height={180}
								width={180}
								src={data?.user.image as string}
							/>
							<AvatarFallback>{data?.user.name.at(1)}</AvatarFallback>
						</Avatar>
					)}
					<div className='flex flex-col justify-center items-start'>
						{isPending ? (
							<Skeleton className='w-20 h-4 rounded' />
						) : (
							<p className='text-gray-900'>{data?.user.name}</p>
						)}
						{isPending ? (
							<Skeleton className='w-28 h-4 mt-1 rounded' />
						) : (
							<p className='text-sm text-gray-500'>{data?.user.email}</p>
						)}
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
