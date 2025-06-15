'use client'

import { ChevronDown } from 'lucide-react'
import { Separator } from '@/shared/components/ui/separator'
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
import { User } from 'better-auth'
import SignOut from '@/shared/components/common/sign-out'

export default function UserMenu({
	user,
	onLogout,
}: {
	user: User
	onLogout: () => void
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex gap-2 items-center'>
					<Avatar className='h-10 w-10 rounded-full'>
						<AvatarImage height={180} width={180} src={user.image as string} />
						<AvatarFallback>{user.name.at(1)}</AvatarFallback>
					</Avatar>
					<div className='hidden md:flex flex-col justify-center items-start'>
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
				<DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
