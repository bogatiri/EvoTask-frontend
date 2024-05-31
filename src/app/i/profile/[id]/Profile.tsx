'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/Heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { TransparentFieldTextarea } from '@/components/ui/fields/TransparentFieldTextarea'

import { TypeUserForm } from '@/types/auth.types'

import { useUserDebounce } from '../hooks/useUserDebounce'
import { useUserId } from '../hooks/useUserId'

export default function UserId() {
	const { user, isLoading } = useUserId()
	const [currentUser, setCurrentUser] = useState('')
	const my = currentUser === user?.id.toString()
	useEffect(() => {
		const localUserId = localStorage.getItem('userId')
		setCurrentUser(localUserId ?? '')
	}, [])

	useEffect(() => {
    document.title = user?.name ? `EvoTask | ${user?.name}` : `EvoTask | ${user?.email}`;
  }, [user]);

	const { register, control, watch, reset } = useForm<TypeUserForm>({
		defaultValues: {
			name: user?.name,
			about: user?.about,
			phone: user?.phone,
			lastName: user?.lastName,
			organization: user?.organization,
			post: user?.post,
			avatar: user?.avatar
		}
	})

	useEffect(() => {
		if (user) {
			reset({
				name: user.name,
				about: user.about,
				phone: user.phone,
				lastName: user.lastName,
				organization: user.organization,
				post: user.post,
				avatar: user.avatar
			})
		}
	}, [user, reset])

	useUserDebounce({ watch })
	
	if (user) {
		const [dateStr, timeStr] = user.createdAt.toString().split('T')

		return (
			<>
				{user?.name ? (
					<Heading title={user.name} />
				) : user.email ? (
					<Heading title={user.email} />
				) : (
					<Heading title='Profile' />
				)}

				<div className=' flex flex-col relative size-full bg-no-repeat bg-cover bg-center pr-24 pl-24'>
					<div className='p-4 grid grid-cols-2 gap-4 gap-x-16 text-lg text-card-foreground h-full overflow-x-auto '>
						<div className='row-span-6'>
							<div className='grid grid-cols-2'>
								<Dialog>
									<DialogTrigger disabled={!my}>
										<div className='flex items-center justify-center'>
											{user.avatar ? (
												<Avatar className='size-72'>
													<AvatarImage src={user.avatar} />
												</Avatar>
											) : (
												<Avatar className='size-72'>
													<AvatarFallback className='text-9xl'>
														{user.name
															? user.name.charAt(0).toUpperCase()
															: user.email.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
											)}
										</div>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Avatar</DialogTitle>
											<DialogDescription>
												You can paste here a link to the picture that you want
												to see as your avatar
											</DialogDescription>
										</DialogHeader>
										<span>URL to picture:</span>
										<div className='border border-border rounded-md p-2 '>
											<TransparentField
												autoComplete='off'
												disabled={!my}
												className={user.name ? 'opacity-100' : 'opacity-50'}
												placeholder='URL to your avatar'
												{...register('avatar')}
											/>
										</div>
									</DialogContent>
								</Dialog>
								<div className='p-4 flex flex-col border opacity-80 hover:opacity-100 justify-center gap-5 shadow-md rounded-lg cursor-default select-none items-center transition'>
									<p className='text-gray-800 text-lg font-semibold'>
										{user.name}
									</p>
									<p className='text-gray-500'>User has been registered</p>
									<p className='text-gray-600'>
										<span>Date: </span>
										{dateStr}
									</p>
									<p className='text-gray-600'>
										<span>Time: </span>
										{timeStr.split('.')[0]}
									</p>
								</div>
							</div>
						</div>
						<span className='cursor-default select-none ml-2'>Name:</span>
						<div className='border border-border rounded-md p-2 '>
							<TransparentField
								autoComplete='off'
								disabled={!my}
								className={user.name ? 'opacity-100' : 'opacity-50'}
								placeholder='Ivan'
								{...register('name')}
							/>
						</div>
						<span className='cursor-default select-none ml-2'>Last Name:</span>

						<div className='border border-border rounded-md p-2'>
							<TransparentField
								autoComplete='off'
								disabled={!my}
								className={user.lastName ? 'opacity-100' : 'opacity-50'}
								placeholder='Ivanov'
								{...register('lastName')}
							/>
						</div>
						<span className='cursor-default select-none ml-2'>Phone Number:</span>

						<div className='border border-border rounded-md p-2'>
							<TransparentField
								autoComplete='off'
								disabled={!my}
								className={user.phone ? 'opacity-100' : 'opacity-50'}
								placeholder='+7(999)-999-99-99'
								{...register('phone')}
							/>
						</div>
						<div>
							<span className='cursor-default select-none ml-2'>Organization:</span>

							<div className='border border-border mt-4 rounded-md p-2 '>
								<TransparentField
									autoComplete='off'
									disabled={!my}
									className={user.organization ? 'opacity-100' : 'opacity-50'}
									placeholder='PAO Rostelekom'
									{...register('organization')}
								/>
							</div>
						</div>
						<div>
							<span className='cursor-default select-none ml-2'>Designation:</span>

							<div className='border border-border mt-4 rounded-md p-2 '>
								<TransparentField
									autoComplete='off'
									disabled={!my}
									className={user.post ? 'opacity-100' : 'opacity-50'}
									placeholder='Frontend developer'
									{...register('post')}
								/>
							</div>
						</div>
						<span className='cursor-default select-none ml-2'>About:</span>
						<div className='col-span-2'>
							<TransparentFieldTextarea
								placeholder='About...'
								disabled={!my}
								{...register('about')}
							/>
						</div>
					</div>
				</div>
			</>
		)
	}
}
