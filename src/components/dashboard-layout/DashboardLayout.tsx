'use client'

import { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type ImperativePanelHandle } from 'react-resizable-panels'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from '@/components/ui/resizable'

import { TypeUserForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'
import { useUserDebounce } from '@/app/i/profile/hooks/useUserDebounce'
import { usePathname } from 'next/navigation'
import { ArrowBigDown } from 'lucide-react'
import SmallSidebar from './sidebar/SmallSidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	const [isInitialized, setIsInitialized] = useState<boolean>(false)

	const { data, isLoading, isSuccess } = useProfile()
	console.log(data)
	const [sidebar, setSidebar] = useState<number | null>(
		isLoading ? null : +data!.user.sidebarWidth
	)
	const refA = useRef<ImperativePanelHandle>(null)

	useEffect(() => {
		if (data) {
			console.log('data', data)
			setSidebar(+data.user.sidebarWidth)
			if (refA.current) {
				setTimeout(() => refA.current?.resize(+data.user.sidebarWidth), 10)
				const a = refA.current?.getSize()
			}
			setIsInitialized(true)
		}
	}, [data])

	const { watch, setValue } = useForm<TypeUserForm>({
		defaultValues: {
			sidebarWidth: data?.user.sidebarWidth
		}
	})

	const onResize = (size: number) => {
		if (isInitialized) {
			setSidebar(size)
			{
				sidebar !== size && setValue('sidebarWidth', sidebar!.toString())
			}
		}
	}

	useUserDebounce({ watch })

	const pathName = usePathname()

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<ResizablePanelGroup
					className='grid min-h-screen md:grid-cols-[0.5fr_6fr] 2xl:grid-cols-[0.8fr_6fr] grid-cols-[1.2fr_6fr]'
					direction='horizontal'
				>
					<ResizablePanel
					className='hidden xl:block'
						minSize={9}
						defaultSize={sidebar! }
						maxSize={20}
						onResize={onResize}
						ref={refA}
					>
						<Sidebar
						sidebar={sidebar}
						/>
					</ResizablePanel>
					<div className='xl:hidden fixed z-50'>
					<SmallSidebar/>
					</div>
					<ResizableHandle  />
					<ResizablePanel defaultSize={100-sidebar!}>
						<main className='overflow-x-hidden h-full max-h-screen relative'>
							{(!pathName.includes('board') && (
								<Header />
							))}
							{children}
						</main>
					</ResizablePanel>
				</ResizablePanelGroup>
			)}
		</>
	)
}
