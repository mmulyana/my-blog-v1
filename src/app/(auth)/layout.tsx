export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className='min-h-screen flex justify-center items-center px-4'>
			{children}
		</div>
	)
}
