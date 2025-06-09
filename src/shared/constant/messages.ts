export const messages = {
	success: {
		saved: 'Successfully saved!',
		deleted: 'Successfully deleted!',
		updated: 'Successfully updated!',
	},
	error: {
		general: 'Something went wrong. Please try again.',
		notFound: 'The requested item could not be found.',
		server: 'Our servers are experiencing issues. Please try again later.',
	},
	validation: {
		general: 'Please check your input. Some fields are invalid.',
		required: 'This field is required.',
		invalidFormat: 'The input for this field is not in a valid format.',
		minLength: (length: number) =>
			`This field must be at least ${length} characters long.`,
		maxLength: (length: number) =>
			`This field cannot exceed ${length} characters.`,
	},
	info: {
		noChanges: 'No changes were detected.',
		confirmDelete: 'Are you sure you want to delete this item?',
	},
}
