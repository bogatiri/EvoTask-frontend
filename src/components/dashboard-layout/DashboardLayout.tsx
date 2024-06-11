'use client'

import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useRef } from 'react'
import { type ImperativePanelHandle } from 'react-resizable-panels'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from '@/components/ui/resizable'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'
import SmallSidebar from './sidebar/SmallSidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	const refA = useRef<ImperativePanelHandle>(null)

	const pathName = usePathname()

	return (
		<>
			<ResizablePanelGroup
				className='grid min-h-screen md:grid-cols-[0.5fr_6fr] 2xl:grid-cols-[0.8fr_6fr] grid-cols-[1.2fr_6fr]'
				direction='horizontal'
			>
				<ResizablePanel
					className='hidden 3xl:block'
					minSize={9}
					defaultSize={13}
					maxSize={20}
					ref={refA}
				>
					<Sidebar sidebar={15} />
				</ResizablePanel>
				<div className='3xl:hidden absolute top-1/2 transform -translate-y-1/2 z-50'>
					<SmallSidebar />
				</div>
				<ResizableHandle className='hidden xl:block' />
				<ResizablePanel defaultSize={100 - 13}>
					<main className='overflow-x-hidden h-full max-h-screen relative'>
						{!pathName.includes('board') && <Header />}
						{children}
					</main>
				</ResizablePanel>
			</ResizablePanelGroup>
		</>
	)
}
