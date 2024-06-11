import { ChevronsUpDown } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Command, CommandGroup } from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import { IBoardResponse } from '@/types/board.types'
import { ICardResponse } from '@/types/card.types'
import { IRolesResponse } from '@/types/roles.types'

import User from './user'
import UserAvatar from './userAvatar'
import { IUser } from '@/types/auth.types'

interface IUserProps {
	data: ICardResponse | IBoardResponse | IRolesResponse 
}

const Users = ({ data }: IUserProps) => {

	return (
		<Popover>
			<PopoverTrigger>
				{data.users.length > 0 ? (
					<div className='flex flex-col min-w-[150px]  opacity-70 hover:opacity-100 cursor-pointer justify-between items-center gap-2 transition-opacity '>
						<div className='flex gap-1 items-center w-full'>

						<div className='flex pl-1 w-full justify-center'>
							{data.users.map((user, index) => (
								<div
									key={user.id}
									className='flex justify-start -mr-5'
								>
									<UserAvatar
									userToAvatar={user}
									/>
								</div>
							))}
						</div>
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
						</div>
						{data.users.length > 5 && (
							<div className=' flex pl-2 justify-start items-center'>
								<span className='text-gray-500 text-xs'>
									and {data.users.length - 5} other
								</span>
							</div>
						)}
					</div>
				) : (
					<span>no users </span>
				)}
			</PopoverTrigger>
			<PopoverContent className='w-auto min-w-[210px] p-0 rounded-xl'>
				<Command>
					<CommandGroup className='w-auto'>
						{data.users.length > 0 ? (
							data.users?.map((user, index) => (
								<User
									key={user.id}
									userToAvatar={user}
									user={user}
								/>
							))
						) : (
							<div>no users</div>
						)}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default Users
