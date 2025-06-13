'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { createLowlight } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import php from 'highlight.js/lib/languages/php'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Separator } from '@/shared/components/ui/separator'
import {
	Bold,
	Italic,
	Code,
	Code2,
	ImageIcon,
	LinkIcon,
	List,
	ListOrdered,
	Quote,
	Undo,
	Redo,
	Heading1,
	Heading2,
	Heading3,
} from 'lucide-react'
import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'

const lowlight = createLowlight()
lowlight.register('javascript', javascript)
lowlight.register('typescript', typescript)
lowlight.register('python', python)
lowlight.register('css', css)
lowlight.register('html', html)
lowlight.register('php', php)

export default function TextEditor({
	defaultValue,
	onChange,
}: {
	defaultValue?: string
	onChange?: (val: string) => void
}) {
	const [imageUrl, setImageUrl] = useState('')
	const [linkUrl, setLinkUrl] = useState('')
	const [linkText, setLinkText] = useState('')
	const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
	const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)

	const editor = useEditor({
		extensions: [
			StarterKit,
			CodeBlockLowlight.configure({
				lowlight,
				defaultLanguage: 'javascript',
			}),
			Image.configure({
				HTMLAttributes: {
					class: 'max-w-full h-auto rounded-lg',
				},
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'text-blue-500 underline cursor-pointer',
				},
			}),
		],
		content: defaultValue ?? '',
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			onChange?.(html)
		},
		editorProps: {
			attributes: {
				class: 'prose p-4 max-w-full bg-gray-50 min-h-[400px]',
				spellcheck: 'false',
			},
		},
		immediatelyRender: false,
	})

	const addImage = () => {
		if (imageUrl && editor) {
			editor.chain().focus().setImage({ src: imageUrl }).run()
			setImageUrl('')
			setIsImageDialogOpen(false)
		}
	}

	const addLink = () => {
		if (linkUrl && editor) {
			if (linkText) {
				editor
					.chain()
					.focus()
					.insertContent(`<a href="${linkUrl}">${linkText}</a>`)
					.run()
			} else {
				editor.chain().focus().setLink({ href: linkUrl }).run()
			}
			setLinkUrl('')
			setLinkText('')
			setIsLinkDialogOpen(false)
		}
	}

	if (!editor) {
		return null
	}

	return (
		<div className='w-full'>
			<div className='border border-border rounded-lg overflow-hidden bg-white'>
				{/* Toolbar */}
				<div className='p-2 flex flex-wrap gap-1 border-b border-border'>
					{/* Text Formatting */}
					<Button
						type='button'
						variant={editor.isActive('bold') ? 'default' : 'ghost'}
						size='sm'
						onClick={() => editor.chain().focus().toggleBold().run()}
					>
						<Bold className='h-4 w-4' />
					</Button>
					<Button
						type='button'
						variant={editor.isActive('italic') ? 'default' : 'ghost'}
						size='sm'
						onClick={() => editor.chain().focus().toggleItalic().run()}
					>
						<Italic className='h-4 w-4' />
					</Button>
					<Button
						type='button'
						variant={editor.isActive('code') ? 'default' : 'ghost'}
						size='sm'
						onClick={() => editor.chain().focus().toggleCode().run()}
					>
						<Code className='h-4 w-4' />
					</Button>

					<Separator orientation='vertical' className='h-6' />

					{/* Headings */}
					<Button
						type='button'
						variant={
							editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'
						}
						size='sm'
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
					>
						<Heading1 className='h-4 w-4' />
					</Button>
					<Button
						type='button'
						variant={
							editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
						}
						size='sm'
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
					>
						<Heading2 className='h-4 w-4' />
					</Button>
					<Button
						type='button'
						variant={
							editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'
						}
						size='sm'
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
					>
						<Heading3 className='h-4 w-4' />
					</Button>

					<Separator orientation='vertical' className='h-6' />

					{/* Lists */}
					<Button
						type='button'
						variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
						size='sm'
						onClick={() => editor.chain().focus().toggleBulletList().run()}
					>
						<List className='h-4 w-4' />
					</Button>
					<Button
						type='button'
						variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
						size='sm'
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
					>
						<ListOrdered className='h-4 w-4' />
					</Button>
					<Button
						type='button'
						variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
						size='sm'
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
					>
						<Quote className='h-4 w-4' />
					</Button>

					<Separator orientation='vertical' className='h-6' />

					{/* Code Block */}
					<Button
						type='button'
						variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
						size='sm'
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					>
						<Code2 className='h-4 w-4' />
					</Button>

					{/* Image Dialog */}
					<Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
						<DialogTrigger asChild>
							<Button type='button' variant='ghost' size='sm'>
								<ImageIcon className='h-4 w-4' />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Image</DialogTitle>
							</DialogHeader>
							<div className='space-y-4'>
								<div>
									<Label htmlFor='image-url'>Image URL</Label>
									<Input
										id='image-url'
										placeholder='https://example.com/image.jpg'
										value={imageUrl}
										onChange={(e) => setImageUrl(e.target.value)}
									/>
								</div>
								<Button type='button' onClick={addImage} className='w-full'>
									Add Image
								</Button>
							</div>
						</DialogContent>
					</Dialog>

					{/* Link Dialog */}
					<Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
						<DialogTrigger asChild>
							<Button type='button' variant='ghost' size='sm'>
								<LinkIcon className='h-4 w-4' />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Link</DialogTitle>
							</DialogHeader>
							<div className='space-y-4'>
								<div>
									<Label htmlFor='link-url'>URL</Label>
									<Input
										id='link-url'
										placeholder='https://example.com'
										value={linkUrl}
										onChange={(e) => setLinkUrl(e.target.value)}
									/>
								</div>
								<div>
									<Label htmlFor='link-text'>Link Text (optional)</Label>
									<Input
										id='link-text'
										placeholder='Click here'
										value={linkText}
										onChange={(e) => setLinkText(e.target.value)}
									/>
								</div>
								<Button type='button' onClick={addLink} className='w-full'>
									Add Link
								</Button>
							</div>
						</DialogContent>
					</Dialog>

					<Separator orientation='vertical' className='h-6' />

					{/* Undo/Redo */}
					<Button
						type='button'
						variant='ghost'
						size='sm'
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
					>
						<Undo className='h-4 w-4' />
					</Button>
					<Button
						type='button'
						variant='ghost'
						size='sm'
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}
					>
						<Redo className='h-4 w-4' />
					</Button>
				</div>

				{/* Editor Content */}
				<EditorContent editor={editor} />
			</div>
		</div>
	)
}
