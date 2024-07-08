'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/Heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TransparentFieldTextarea } from '@/components/ui/fields/TransparentFieldTextarea'
import { TypeUserUpdateForm } from '@/types/auth.types'

import { useUserDebounce } from '../hooks/useUserDebounce'
import { useUserId } from '../hooks/useUserId'

import AvatarInput from './avatar-input'
import UserField from './user-field'

export default function UserId() {
	const { user, isLoading } = useUserId()

	const [currentUser, setCurrentUser] = useState('')

	const my = currentUser === user?.id.toString()

	useEffect(() => {
		const localUserId = localStorage.getItem('userId')
		setCurrentUser(localUserId ?? '')
	}, [])

	useEffect(() => {
		document.title = user?.name
			? `EvoTask | ${user?.name}`
			: `EvoTask | ${user?.email}`
	}, [user])
	
	const { register, control, watch, reset } = useForm<TypeUserUpdateForm>({
		defaultValues: {
			name: user?.name,
			about: user?.about,
			phone: user?.phone,
			lastName: user?.lastName,
			organization: user?.organization,
			post: user?.post
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
				post: user.post
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

				<div className='flex flex-col md:relative mt-layout items-center md:items-start md:ml-big-layout md:pr-big-layout size-full justify-between gap-5 px-3'>
					<div className='grid grid-rows-[0.5fr_0.5fr_1.5fr] md:grid-rows-1 w-full md:pr-layout xl:pr-0 md:grid-cols-2 h-full xl:grid-cols-[0.5fr_0.5fr_1fr]  gap-5 md:justify-center'>
						<div className='flex w-full justify-center'>
							<Dialog>
								<DialogTrigger disabled={!my}>
									{user.avatar ? (
										<Avatar className='size-48 md:size-72'>
											<AvatarImage src={user.avatar} />
										</Avatar>
									) : (
										<Avatar className='size-48 md:size-72'>
											<AvatarFallback className='text-9xl'>
												{user.name
													? user.name.charAt(0).toUpperCase()
													: user.email?.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									)}
								</DialogTrigger>
								<AvatarInput currentUser={currentUser} />
							</Dialog>
						</div>
						<div className='p-4 w-full flex flex-col mt-1 border opacity-80 hover:opacity-100 justify-center gap-5 shadow-md rounded-lg cursor-default select-none items-center transition mr-10 xl:pr-0'>
							<p className='text-gray-800 text-lg font-semibold'>{user.name}</p>
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
						<div className='w-full h-full xl:pr-10 md:col-span-2 xl:col-span-1'>
							<UserField
								text='name'
								maxLength={30}
								disabled={!my}
								placeholder='Ivan'
								register={register}
								user={user}
							/>
							<UserField
								text='post'
								maxLength={30}
								disabled={!my}
								placeholder='Frontend developer'
								register={register}
								user={user}
							/>
							<UserField
								text='lastName'
								maxLength={30}
								disabled={!my}
								placeholder='Ivanov'
								register={register}
								user={user}
							/>
							<UserField
								type='tel'
								text='phone'
								maxLength={17}
								disabled={!my}
								placeholder='7(999)-999-99-99'
								register={register}
								user={user}
							/>
							{/* <UserField
								text='organization'
								maxLength={30}
								disabled={!my}
								placeholder='organization'
								register={register}
								user={user}
							/> */}
						</div>
					</div>
					<div className='w-full md:pr-layout xl:pr-10 xl:mr-2'>
						<span className='cursor-default select-none ml-2'>About:</span>
						<div className='mt-4'>
							<TransparentFieldTextarea
								className='h-auto'
								maxLength={1500}
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
