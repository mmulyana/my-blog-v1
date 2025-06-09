import { UseFormReturn } from 'react-hook-form'

import CuisineSelector from '@/shared/components/common/cuisine-selector'
import ButtonSubmit from '@/shared/components/common/button-submit'
import TextEditor from '@/shared/components/common/text-editor'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import { Post } from '../schema'
import AlertDestroyPost from './alert-destory-post'

export default function FormPost({
	form,
	onSubmit,
	isPending,
	categories,
	id,
}: {
	id?: string
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
						<FormItem>
							<FormLabel>Kategori</FormLabel>
							<CuisineSelector
								data={categories || []}
								value={field.value || []}
								onChange={field.onChange}
							/>
						</FormItem>
					)}
				/>
				<div>
					<p className='text-red-400 text-sm'>
						Warning! This action cannot be undone. Please make sure you are
						absolutely sure before proceeding.
					</p>
					<AlertDestroyPost id={id} />
				</div>

				<div className='bg-white fixed bottom-0 left-0 w-full h-16 border-t shadow-sm flex items-center justify-end px-4'>
					<ButtonSubmit isPending={isPending || false} />
				</div>
			</form>
		</Form>
	)
}
