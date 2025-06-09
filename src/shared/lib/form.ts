import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export function handleFieldErrors<T extends FieldValues>(
	form: Pick<UseFormReturn<T>, 'setError'>,
	errors: Record<string, any>
) {
	if (!errors) return

	for (const [field, errorMessages] of Object.entries(errors)) {
		if (Array.isArray(errorMessages) && errorMessages.length > 0) {
			form.setError(field as Path<T>, { message: errorMessages.join(', ') })
		}
	}
}
