'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

import ButtonSubmit from '@/shared/components/common/button-submit'
import { Input } from '@/shared/components/ui/input'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import { authClient } from '@/shared/lib/auth-client'

export default function FormRegister() {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)

	const form = useForm<any>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: any) {
		const { name, email, password } = values
		const { data, error } = await authClient.signUp.email(
			{
				email,
				name,
				password,
				callbackURL: '/admin',
			},
			{
				onRequest: (ctx) => {
					setIsPending(true)
				},
				onSuccess: () => {
					form.reset()
					router.push('/admin')
				},
				onError: ({ error }) => {
					console.log(error)
					toast.error(error.message)
				},
			}
		)
		console.log('error', error)
	}

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create your account to get started.</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='john doe' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='john@mail.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Enter your password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<ButtonSubmit isPending={isPending} />
					</form>
				</Form>
			</CardContent>

			<CardFooter className='flex justify-center'>
				<p className='text-sm text-muted-foreground'>
					Already have an account?{' '}
					<Link href='/sign-in' className='text-primary hover:underline'>
						Sign in
					</Link>
				</p>
			</CardFooter>
		</Card>
	)
}
