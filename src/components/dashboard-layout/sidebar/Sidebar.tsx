'use client'

import { GanttChartSquare } from 'lucide-react'
import Link from 'next/link'
import Logo from '../../../public/cypresslogo.svg';
import { COLORS } from '@/constants/color.constants'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'
import { SITE_NAME } from '@/constants/seo.constants'


export function Sidebar() {
	return (
		<aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
			<div>
				<Link
					href='/'
					className='flex items-center gap-2.5 p-layout border-b border-b-border'
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={38}
					/>
					<span className='text-2xl font-bold relative'>
						{SITE_NAME}
						<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
							beta
						</span>
					</span>
				</Link>
				<div className='p-3 relative'>
					<LogoutButton />
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
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
			</footer>
		</aside>
	)
}
