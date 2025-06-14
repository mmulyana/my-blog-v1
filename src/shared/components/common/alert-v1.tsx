import { Trash } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button, buttonVariants } from '../ui/button'

export function AlertV1({
	label = 'Show',
	title = 'Are you absolutely sure?',
	subtitle = 'This action cannot be undone. This will permanently delete your data from our servers.',
	callback,
	className,
	icon = false,
}: {
	label?: string
	title?: string
	subtitle?: string
	callback?: () => void
	className?: string
	icon?: boolean
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className={className}>
					{icon && <Trash className='border' size={18} />}
					{label}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{subtitle}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: 'destructive' })}
						onClick={() => {
							callback?.()
						}}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
