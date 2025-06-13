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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { Separator } from '@/shared/components/ui/separator'
import AlertPublishPost from './alert-publish-post'
import { PostStatus } from '@prisma/client'

export default function FormPost({
	form,
	onSubmit,
	isPending,
	categories,
	sections,
	id,
	status,
}: {
	id?: string
	form: UseFormReturn<Post>
	onSubmit: (data: Post) => void
	isPending?: boolean
	categories?: { id: string; name: string }[]
	sections?: { id: string; name: string }[]
	status?: PostStatus
}) {
	return (
		<Form {...form}>
			<form
				className='max-w-6xl mx-auto mt-4 pb-8'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6'>
					<div className='p-6 rounded-xl bg-white space-y-5 border'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
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
						<div className='w-full flex justify-end gap-4'>
							{id && <AlertPublishPost status={status} id={id} />}
							<ButtonSubmit isPending={isPending || false} />
						</div>
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
							name='section'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Section</FormLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select section' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{sections?.map((i) => (
												<SelectItem key={i.id} value={i.id}>
													{i.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='categories'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<CuisineSelector
										data={categories || []}
										value={field.value || []}
										onChange={field.onChange}
									/>
								</FormItem>
							)}
						/>
						{id && <Separator />}
						{id && (
							<div className='flex justify-between items-center mt-6'>
								<div>
									<p className='text-gray-800 text-sm font-medium'>
										Delete Post
									</p>
									<p className='text-sm text-gray-400'>
										This action cannot be undone.
									</p>
								</div>
								<AlertDestroyPost id={id} />
							</div>
						)}
					</div>
				</div>
			</form>
		</Form>
	)
}
