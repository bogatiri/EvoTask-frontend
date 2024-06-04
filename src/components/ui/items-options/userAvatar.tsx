import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAvatar } from '@/hooks/useProfile'

import { IUser } from '@/types/auth.types'
import { useState } from 'react'
import Loader from '../Loader'

interface IUserProps {
	userToAvatar: IUser
	user?: IUser
}

const UserAvatar = ({ userToAvatar, user }: IUserProps) => {


	const {image, isLoading} = getAvatar(userToAvatar.avatar!)

	if (isLoading) {
		return <Loader/>
	}
	
	return (
		<>
			{userToAvatar.avatar ? (
				<Avatar className='h-8 w-8 border border-border'>
					<AvatarImage src={image}></AvatarImage>
				</Avatar>
			) : (
				<Avatar className='h-8 w-8 border border-border'>
					<AvatarFallback>
						{userToAvatar.name
							? userToAvatar.name.charAt(0).toUpperCase()
							: userToAvatar.email.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			)}
			{user?.name ? (
				<p className='font-semibold text-neutral-700 text-sm'>{user?.name}</p>
			) : (
				<p className='font-semibold text-sm text-neutral-700'>{user?.email}</p>
			)}
		</>
	)
}

export default UserAvatar
