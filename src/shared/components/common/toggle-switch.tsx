'use client'

import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

type Props = {
	label?: string
	value?: boolean
	onCheck?: (val: boolean) => void
	disabled?: boolean
}
export default function ToggleSwitch({
	label,
	value = false,
	onCheck,
	disabled,
}: Props) {
	return (
		<div className='flex items-center space-x-2'>
			<Switch
				checked={value}
				onCheckedChange={(val) => onCheck?.(val)}
				disabled={disabled}
			/>
			{label && (
				<Label className='text-ink-primary/70 text-sm font-normal'>
					{label}
				</Label>
			)}
		</div>
	)
}
