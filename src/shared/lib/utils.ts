import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function convertToPlainObject<T>(value: T): T {
	return JSON.parse(JSON.stringify(value))
}

export function formatNumberWithDecimal(num: number): string {
	const [int, decimal] = num.toString().split('.')
	return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
}

export function formatError(error: any): string {
	if (error.name === 'ZodError') {
		// Handle Zod error
		const fieldErrors = error.errors.map((err: any) => {
			return err.message
		})
		return fieldErrors.join('. ')
	} else if (
		error.name === 'PrismaClientKnownRequestError' &&
		error.code === 'P2002'
	) {
		// Handle Prisma error
		const field = error.meta?.target ? error.meta.target[0] : 'Field'
		return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
	} else {
		// Handle other errors
		return typeof error.message === 'string'
			? error.message
			: JSON.stringify(error.message)
	}
}

export function diffForHumans(targetDate: Date) {
	if (isNaN(targetDate.getTime())) {
		return ''
	}

	return formatDistanceToNow(targetDate, { addSuffix: true, locale: id })
}
