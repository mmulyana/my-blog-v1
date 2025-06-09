import { UseFormReturn } from 'react-hook-form'
import { Post } from '../schema'
import ButtonSubmit from '@/components/common/button-submit'
import TextEditor from '@/components/common/text-editor'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import CuisineSelector from '@/components/common/cuisine-selector'

export default function FormPost({
	form,
	onSubmit,
	isPending,
	categories,
}: {
	form: UseFormReturn<Post>
	onSubmit: (data: Post) => void
	isPending?: boolean
	categories?: { id: string; name: string }[]
}) {
	return (
		<Form {...form}>
			<form
				className='max-w-4xl mx-auto p-4 space-y-5 pb-16'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Judul</FormLabel>
							<FormControl>
								<Input className='bg-white' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<TextEditor
									defaultValue={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='categories'
					render={({ field }) => (
						<CuisineSelector
							data={categories || []}
							value={field.value || []}
							onChange={field.onChange}
						/>
					)}
				/>
				<div className='bg-white fixed bottom-0 left-0 w-full h-16 border-t shadow-sm flex items-center justify-end px-4'>
					<ButtonSubmit isPending={isPending || false} />
				</div>
			</form>
		</Form>
	)
}
