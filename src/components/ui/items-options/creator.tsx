import { IUser } from '@/types/auth.types'

import User from './user'

interface ICreatorProps {
	creator: IUser
}

const Creator = ({ creator }: ICreatorProps) => {
	return (
		<div className='flex gap-2 justify-center items-center mr-5'>
			<p className='font-semibold text-sm text-neutral-700 '>Creator:</p>
			<User
				userToAvatar={creator}
				user={creator}
			/>
		</div>
	)
}

export default Creator
