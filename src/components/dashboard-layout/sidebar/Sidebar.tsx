'use client'

import { useMutation } from '@tanstack/react-query'
import { GanttChartSquare, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { COLORS } from '@/constants/color.constants'
import { SITE_NAME } from '@/constants/seo.constants'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'
import { authService } from '@/services/auth.service'

export function Sidebar() {
	const [currentUser, setCurrentUser] = useState('')
	useEffect(() => {
		const localUserId = localStorage.getItem('userId')
		setCurrentUser(localUserId ?? '')
	}, [])

	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			router.push('/')
			localStorage.clear()
		}
	})

	return (
		<aside className='border-r w-full border-r-border h-full bg-sidebar flex flex-col justify-between flex-grow'>
			<div>
				<Link
					href='/'
					className='flex items-center gap-2.5 p-layout border-b border-b-border'
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={38}
					/>
					<span className='text-2xl text-white font-bold relative'>
						{SITE_NAME}
						<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
							beta
						</span>
					</span>
				</Link>
				<div className='p-3 relative'>
					<div>
						<Link
							href={`${DASHBOARD_PAGES.PROFILE}/${currentUser}`}
							className='flex gap-2.5 items-center py-1.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg'
						>
							<User />
							<span>Profile</span>
						</Link>
					</div>
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
			<div>
				<div className='border-b border-b-border'>
					<div
						className='flex gap-2.5 items-center  py-1.5 m-3 px-layout transition-colors hover:bg-border rounded-lg cursor-pointer '
						onClick={() => mutate()}
					>
						<LogOut />
						<span>Logout</span>
					</div>
				</div>
				<footer className='text-xs opacity-40 font-normal text-center p-layout'>
					2024 &copy; Powered By{' '}
					<a
						href='https://t.me/ro4evalexey'
						target='_blank'
						rel='noreferrer'
						className='hover:text-primary text-brand-300 transition-colors'
					>
						{SITE_NAME}
					</a>
					. <br /> All rights reserved.
				</footer>{' '}
			</div>
		</aside>
	)
}
