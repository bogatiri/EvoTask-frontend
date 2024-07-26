'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { SITE_NAME } from '@/constants/seo.constants'

import Logo from '../../../../public/evotasklogo.svg'

import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'
import { authService } from '@/services/auth.service'

interface ISidebarProps {
	sidebar: number | null
}

export function Sidebar({ sidebar }: ISidebarProps) {
	const { setTheme } = useTheme()

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
					href='/i/scrumban'
					className='flex items-center justify-center gap-2.5 p-layout border-b border-b-border'
				>
					<Image
						src={Logo}
						alt='EvoTask Logo'
						className='w-10 h-10'
					/>
					{sidebar! > 9 && (
						<span className='text-2xl  font-bold relative'>
							{SITE_NAME}
							<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
								beta
							</span>
						</span>
					)}
				</Link>
				<div className='flex flex-col p-3 '>
					{MENU.map(item => (
						<MenuItem
							currentUser={currentUser}
							sidebar={sidebar}
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							size='icon'
						>
							<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
							<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
							<span className='sr-only'>Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={() => setTheme('light')}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('dark')}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('system')}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className='cursor-pointer'>
					<div
						className={`flex gap-2.5 ${sidebar! < 10 && 'justify-center w-full'} items-center py-1.5 m-3 px-layout transition-colors hover:bg-border rounded-lg`}
						onClick={() => mutate()}
					>
						{(sidebar! > 10 || sidebar! < 10) && <LogOut />}
						{sidebar! > 10 && <span>Logout</span>}
					</div>
				</div>
				<footer className='text-xs border-t border-t-border opacity-40 font-normal text-center p-layout'>
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
			</div>
		</aside>
	)
}
