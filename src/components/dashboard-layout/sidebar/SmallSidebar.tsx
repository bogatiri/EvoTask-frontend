'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { Moon, Sun } from 'lucide-react'
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
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'

import { SITE_NAME } from '@/constants/seo.constants'

import Logo from '../../../../public/evotasklogo.svg'

import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'
import { authService } from '@/services/auth.service'

const SmallSidebar = () => {
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
		<Sheet>
			<SheetTrigger>
				<div className='rounded-md m-1 bg-transition hover:text-accent-foreground'>
					<Separator
						orientation='vertical'
						className='w-2 bg-[#858585] rounded-xl h-28'
					/>
				</div>
			</SheetTrigger>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle>
						<Link
							href='/i/scrumban'
							className='flex items-center justify-center gap-2.5 p-3 border-b border-b-border'
						>
							<Image
								src={Logo}
								alt='EvoTask Logo'
								className='w-10 h-10'
							/>
							<span className='text-2xl font-bold relative'>
								{SITE_NAME}
								<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
									beta
								</span>
							</span>
						</Link>
					</SheetTitle>
				</SheetHeader>
				<div className='flex flex-col h-full'>
					<div className='flex flex-col h-full max-h-[85%] w-full  p-2 gap-2'>
						{MENU.map(item => (
							<MenuItem
								currentUser={currentUser}
								sidebar={20}
								item={item}
								key={item.link}
							/>
						))}
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
					</div>
					<SheetFooter className='flex flex-col sm:flex-col justify-center w-full self-end'>
						<Separator />
						<div className=' w-full cursor-pointer'>
							<div
								className={`flex gap-2.5  items-center py-1.5 m-3 px-layout transition-colors hover:bg-border rounded-lg`}
								onClick={() => mutate()}
							>
								<LogOut />
								<span>Logout</span>
							</div>
						</div>
					</SheetFooter>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default SmallSidebar
