'use client'

import ToggleSwitch from '@/shared/components/common/toggle-switch'
import { toast } from 'sonner'
import { toggle } from '../action'

export default function ToggleFeatured({
	id,
	value,
}: {
	id: string
	value: boolean
}) {
	const onToggle = async (id: string) => {
		const res = await toggle(id)
		if (!res.success) {
			toast.error(res.message)
		} else {
			toast.success(res.message)
		}
	}

	return (
		<ToggleSwitch label='Featured' value={value} onCheck={() => onToggle(id)} />
	)
}
