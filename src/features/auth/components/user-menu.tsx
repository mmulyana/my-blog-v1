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
import Link from 'next/link'
import { Session, User } from 'better-auth'

export default function UserMenu({ user }: { user: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10 rounded-full'>
						<AvatarImage height={180} width={180} src={user.image as string} />
						<AvatarFallback>{user.name.at(1)}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col justify-center items-start'>
						<p className='text-gray-900'>{user.name}</p>
						<p className='text-sm text-gray-500'>{user.email}</p>
					</div>
					<ChevronDown size={20} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-[var(--radix-popper-anchor-width)]'
				align='end'
			>
				<DropdownMenuItem asChild>
					<Link href={'/profile'}>Open profile</Link>
				</DropdownMenuItem>
				<Separator />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
