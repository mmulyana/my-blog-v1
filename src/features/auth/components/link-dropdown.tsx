'use client'

import { Ellipsis } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

import ModalLink from './modal-link'
import AlertDestroyLink from './alert-destroy-link'

export default function LinkDropdown({
	link,
}: {
	link: {
		id: string
		type: string
		value: string
	}
}) {
	const [open, setOpen] = useState(false)

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' className='h-8 w-8' size='icon'>
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem asChild>
					<ModalLink variant='edit' link={link} />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<AlertDestroyLink id={link.id} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
