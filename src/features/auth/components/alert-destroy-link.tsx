import { toast } from 'sonner'
import { AlertV1 } from '@/shared/components/common/alert-v1'
import { buttonVariants } from '@/shared/components/ui/button'
import { destroy } from '../action/link'

export default function AlertDestroyLink({ id }: { id?: string }) {
	const onDestroy = async () => {
		if (!id) {
			return toast.error('Id is empty')
		}
		const res = await destroy(id)
		if (!res.success) {
			toast.error(res.message)
		} else {
			toast.success(res.message)
		}
	}

	return (
		<AlertV1
			className={buttonVariants({
				variant: 'secondary',
				className: 'bg-white hover:text-red-500 w-full justify-start rounded h-9 text-gray-900 gap-2 px-3',
			})}
			label='Delete'
			callback={() => {
				onDestroy()
			}}
		/>
	)
}
