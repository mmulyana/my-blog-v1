import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { buttonVariants } from '@/shared/components/ui/button'
import { AlertV1 } from '@/shared/components/common/alert-v1'

import { destroy } from '../action'

export default function AlertDestroyPost({ id }: { id?: string }) {
	const router = useRouter()

	const onDestroy = async () => {
		if (!id) {
			return toast.error('Id is empty')
		}
		const res = await destroy(id)
		if (!res.success) {
			toast.error(res.message)
		} else {
			toast.success(res.message)
			router.replace('/admin/posts')
		}
	}

	return (
		<AlertV1
			className={buttonVariants({
				variant: 'destructive',
				className: 'rounded-full',
			})}
			label='Delete'
			callback={() => {
				onDestroy()
			}}
		/>
	)
}
