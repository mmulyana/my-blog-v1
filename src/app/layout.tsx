import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

import ToastWrapper from '@/shared/components/common/toast-wrapper'
import { checkProfile } from '@/features/auth/action'
import { redirect } from 'next/navigation'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'My blog',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ToastWrapper>{children}</ToastWrapper>
			</body>
		</html>
	)
}
