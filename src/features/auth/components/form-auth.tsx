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

type Variant = 'register' | 'login'

type props = {
	variant: Variant
}

export default function FormAuth({ variant }: props) {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)

	const form = useForm<any>({
		defaultValues:
			variant === 'register'
				? { name: '', email: '', password: '' }
				: { email: '', password: '' },
	})

	const onSubmit = async (values: any) => {
		setIsPending(true)

		if (variant === 'register') {
			const { name, email, password } = values
			const { error } = await authClient.signUp.email(
				{
					email,
					name,
					password,
					callbackURL: '/register',
				},
				{
					onRequest: () => setIsPending(true),
					onSuccess: () => {
						form.reset()
						router.push('/onboarding')
					},
					onError: ({ error }) => {
						toast.error(error.message)
					},
				}
			)
		} else {
			const { email, password } = values
			await authClient.signIn.email(
				{
					email,
					password,
					callbackURL: '/admin/posts',
				},
				{
					onRequest: () => setIsPending(true),
					onSuccess: () => {
						form.reset()
						router.push('/dashboard/posts')
					},
					onError: ({ error }) => {
						toast.error(error.message)
					},
				}
			)
		}

		setIsPending(false)
	}

	const isRegister = variant === 'register'

	return (
		<Card className='w-full max-w-md mx-auto shadow-none'>
			<CardHeader>
				<CardTitle>{isRegister ? 'Sign Up' : 'Sign In'}</CardTitle>
				<CardDescription>
					{isRegister
						? 'Create your account to get started.'
						: 'Welcome back! Please sign in to continue.'}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						{isRegister && (
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
						)}

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
					{isRegister ? (
						<>
							Already have an account?{' '}
							<Link href='/login' className='text-primary hover:underline'>
								Sign in
							</Link>
						</>
					) : (
						<>
							Don&apos;t have an account yet?{' '}
							<Link
								href='/register'
								className='text-primary hover:underline'
							>
								Sign up
							</Link>
						</>
					)}
				</p>
			</CardFooter>
		</Card>
	)
}
