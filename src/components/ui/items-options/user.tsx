import Link from 'next/link'


import { IUser } from '@/types/auth.types'
import UserAvatar from './userAvatar'

interface IUserProps {
	userToAvatar: IUser
	user?: IUser
}

const User = ({ userToAvatar, user }: IUserProps) => {

	return (
		<Link
			className='flex gap-1 rounded-md cursor-pointer opacity-70 hover:opacity-100  p-1 justify-between items-center'
			href={`/i/profile/${userToAvatar.id}`}
		>
			<UserAvatar
			userToAvatar={userToAvatar}
			user={user}
			/>
		</Link>
	)
}

export default User
