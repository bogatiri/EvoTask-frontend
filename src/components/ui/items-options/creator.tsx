import { CSSProperties } from 'react'

import { IUser } from '@/types/auth.types'

import User from './user'

interface ICreatorProps {
	creator: IUser
	style?: CSSProperties
}

const Creator = ({ creator, style }: ICreatorProps) => {
	return (
		<div
			className={`hidden md:flex gap-2 justify-center items-center mr-5`}
			style={style}
		>
			<span className=' font-semibold text-sm text-white'>Creator:</span>
			<User
				userToAvatar={creator}
				user={creator}
			/>
		</div>
	)
}

export default Creator
