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
import ImageUploader from '@/shared/components/common/image-uploader'

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
				className='max-w-6xl mx-auto p-4 pb-16'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6'>
					<div className='p-6 rounded-xl bg-white space-y-5 border'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Judul</FormLabel>
									<FormControl>
										<Input {...field} />
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
					</div>
					<div className='p-6 rounded-xl bg-white space-y-5 border h-fit'>
						<FormField
							control={form.control}
							name='file'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Photo</FormLabel>
									<ImageUploader
										value={field.value}
										onChange={field.onChange}
									/>
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
					</div>
				</div>
				{id && (
					<div>
						<p className='text-red-400 text-sm'>
							Warning! This action cannot be undone. Please make sure you are
							absolutely sure before proceeding.
						</p>
						<AlertDestroyPost id={id} />
					</div>
				)}

				<div className='bg-white fixed bottom-0 left-0 w-full h-16 border-t shadow-sm flex items-center justify-end px-4'>
					<ButtonSubmit isPending={isPending || false} />
				</div>
			</form>
		</Form>
	)
}
