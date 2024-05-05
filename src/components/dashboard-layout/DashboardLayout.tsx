import type { PropsWithChildren } from 'react'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className='grid min-h-screen md:grid-cols-[0.5fr_6fr] 2xl:grid-cols-[0.8fr_6fr] grid-cols-[1.2fr_6fr]'>
			<Sidebar />

			<main className='overflow-x-hidden max-h-screen relative'>
				<Header />
				{children}
			</main>
		</div>
	)
}
