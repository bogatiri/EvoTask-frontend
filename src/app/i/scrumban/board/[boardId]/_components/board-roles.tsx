import { ChevronsUpDown, UsersIcon } from 'lucide-react'

import { Command, CommandGroup } from '@/components/ui/command'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger
} from '@/components/ui/dialog'
import User from '@/components/ui/items-options/user'
import Users from '@/components/ui/items-options/users'

import UserAvatar from '@/components/ui/items-options/userAvatar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import { IUser } from '@/types/auth.types'
import { IRolesResponse } from '@/types/roles.types'

import { useAssignARole } from '../../../hooks/roles/useAssignARole'

interface IBoardRoleProps {
	users: IUser[]
	roles: IRolesResponse[]
	creator: string
}

const BoardRoles = ({ users, roles, creator }: IBoardRoleProps) => {
	const currentUser = localStorage.getItem('userId')
	const { assignARole } = useAssignARole()

	const handleAssignRole = (userId: string, index: number) => {
		const boardId = roles[0].boardId
		const id = roles[index].id
		assignARole({ userId, boardId, id })
	}

	const filteredUsers = (users: IUser[], role: IRolesResponse) => {
		return users.filter(
			user => !user.roles.some(rol => rol.boardId === role.boardId)
		)
	}

	return (
		<Dialog>
			<div className='flex items-center justify-center h-10'>
				<DialogTrigger>
					<div className='flex justify-center items-center h-10 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
						<UsersIcon className='hidden md:block h-4 w-4' />
						<span className='text-sm mx-3 my-1.5'>Roles</span>
					</div>
				</DialogTrigger>
			</div>
			<DialogContent>
				<DialogHeader>
					<DialogDescription>
						You can change all of this attributes
					</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col gap-3'>
					{roles &&
						roles.map((role, index) => (
							<div
								className='flex justify-between items-center h-10 w-full'
								key={role.id}
							>
								<span>
									{(role.name === 'scrum_master' && 'Scrum мастер') ||
										(role.name === 'project_owner' && 'Владелец продукта') ||
										(role.name === 'team_member' && 'Участники проекта')}
								</span>
								{role.name === 'team_member' && (
									<Users
									data={role}
									/>
								)}
								{(role.name === 'scrum_master' ||
									role.name === 'project_owner') &&
								role.users.length !== 0 ? (
									<User
										userToAvatar={role.users[0]}
										user={role.users[0]}
									/>
									
								) : (
									<Popover>
										<PopoverTrigger>
											<div className='flex justify-between items-center'>
												<div className='flex opacity-70 hover:opacity-100 cursor-pointer justify-center items-center gap-2 transition-opacity '>
													{currentUser === creator ? (
														<span>Select user...</span>
													) : (
														<div className='flex flex-col min-w-[100px] opacity-70 hover:opacity-100 cursor-pointer justify-between items-start gap-2 transition-opacity '>
															<div className='flex pl-1'>
																{role.users.slice(0, 4).map((user, index) => (
																	<div
																		key={user.id}
																		className='flex justify-start -mr-5'
																	>
																		<UserAvatar userToAvatar={user} />
																	</div>
																))}
															</div>
															{users.length > 4 && (
																<div className=' flex pl-2 justify-start items-center'>
																	<span className='text-gray-500 text-xs'>
																		and {users.length - 4} other
																	</span>
																</div>
															)}
														</div>
													)}
													<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
												</div>
											</div>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0 rounded-xl'>
											<Command>
												<CommandGroup className='w-auto'>
													{currentUser === creator ? (
														filteredUsers(users, role).length > 0 ? (
															filteredUsers(users, role).map(user => (
																<div
																	className='flex gap-1 w-full rounded-md cursor-pointer opacity-70 hover:opacity-100  p-1 justify-between items-center'
																	onClick={() =>
																		handleAssignRole(user.id.toString(), index)
																	}
																	key={user.id}
																>
																	<UserAvatar
																		userToAvatar={user}
																		user={user}
																	/>
																</div>
															))
														) : (
															<p className='select-none p-2 text-sm'>
																no more free users
															</p>
														)
													) : role.users.length > 0 ? (
														role.users.map((user, index) => (
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
								)}
							</div>
						))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default BoardRoles
