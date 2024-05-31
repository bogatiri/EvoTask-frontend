import { ChevronsUpDown, Component } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Command, CommandGroup } from '@/components/ui/command'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
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
}

const BoardRoles = ({ users, roles }: IBoardRoleProps) => {
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
		<div>
			<Dialog>
				<div className='flex items-center justify-center h-10'>
					<DialogTrigger>
						<div className='flex justify-center items-center h-10 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
							<Component className='h-4 w-4' />
							<span className='text-sm mx-3 my-1.5'>Roles</span>
						</div>
					</DialogTrigger>
				</div>
				<DialogContent>
					<DialogHeader>
						<DialogTitle autoFocus={false}>
							<div className='flex gap-3'>
								<div className='flex gap-2 justify-center items-center mr-5'>
									{/* <div className='flex gap-1 items-center justify-center'>
												<Avatar className='h-6 w-6 border border-border'>
													<AvatarImage src={creator.avatar}></AvatarImage>
												</Avatar>
												<p className='font-semibold flex items-center justify-center text-sm text-neutral-700 mb-2'>
													{creator.name}
												</p>
											</div> */}
								</div>
							</div>
						</DialogTitle>
						<DialogDescription>
							You can change all of this attributes
						</DialogDescription>
					</DialogHeader>
					<div className='flex flex-col gap-3'>
						{roles && roles.map((role, index) => (
							<div
								className='flex justify-between items-center h-10 w-full'
								key={index}
							>
								<span>{role.name}</span>
								{(role.name === 'scrum_master' || role.name ==='project_owner')  && role.users.length !== 0 ? (
									<Link
										className='flex gap-1  rounded-md cursor-pointer opacity-70 hover:opacity-100  p-1 justify-between items-center'
										href={`/i/profile/${role.users[0].id}`}
									>
										{role.users[0].avatar ? (
											<Avatar className='h-8 w-8 border border-border'>
												<AvatarImage src={role.users[0].avatar}></AvatarImage>
											</Avatar>
										) : (
											<Avatar className='h-8 w-8 border border-border'>
												<AvatarFallback>
													{role.users[0].name
														? role.users[0].name.charAt(0).toUpperCase()
														: role.users[0].email.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
										)}
										{role.users[0].name ? (
											<p className='font-semibold text-neutral-700 text-sm mb-2'>
												{role.users[0].name}
											</p>
										) : (
											<p className='font-semibold text-sm text-neutral-700 mb-2'>
												{role.users[0].email}
											</p>
										)}
									</Link>
								) : (
									<Popover>
										<PopoverTrigger>
											<div className='flex justify-between items-center'>
												<div className='flex opacity-70 hover:opacity-100 cursor-pointer justify-start items-start gap-2 transition-opacity '>
													{currentUser === role.userId ? (
														<span>Select user...</span>
													) : (
														<div className='flex flex-col opacity-70 hover:opacity-100 cursor-pointer justify-start items-start gap-2 transition-opacity '>
															<div className='flex pl-1'>
																{role.users.slice(0, 4).map((user, index) => (
																	<div
																		key={user.id}
																		className='flex justify-start -mr-5'
																	>
																		{user.avatar ? (
																			<Avatar className='h-8 w-8 border border-border'>
																				<AvatarImage
																					src={user.avatar}
																				></AvatarImage>
																			</Avatar>
																		) : (
																			<Avatar className='h-8 w-8 border border-border'>
																				<AvatarFallback>
																					{user.name
																						? user.name.charAt(0).toUpperCase()
																						: user.email
																								.charAt(0)
																								.toUpperCase()}
																				</AvatarFallback>
																			</Avatar>
																		)}
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
													{currentUser === role.userId ? (
														filteredUsers(users, role).length > 0 ? (
															filteredUsers(users, role).map(user => (
																<div
																	className='flex gap-1 w-full rounded-md cursor-pointer opacity-70 hover:opacity-100  p-1 justify-between items-center'
																	onClick={() =>
																		handleAssignRole(user.id.toString(), index)
																	}
																>
																	{user.avatar ? (
																		<Avatar className='h-8 w-8 border border-border'>
																			<AvatarImage
																				src={user.avatar}
																			></AvatarImage>
																		</Avatar>
																	) : (
																		<Avatar className='h-8 w-8 border border-border'>
																			<AvatarFallback>
																				{user.name
																					? user.name.charAt(0).toUpperCase()
																					: user.email.charAt(0).toUpperCase()}
																			</AvatarFallback>
																		</Avatar>
																	)}
																	{user.name ? (
																		<p className='font-semibold text-neutral-700 text-sm mb-2'>
																			{user.name}
																		</p>
																	) : (
																		<p className='font-semibold text-sm text-neutral-700 mb-2'>
																			{user.email}
																		</p>
																	)}
																</div>
															))
														) : (
															<p className='select-none p-2 text-sm'>
																no more free users
															</p>
														)
													) : role.users.length > 0 ? (
														role.users.map((user, index) => (
															<Link
																href={`/i/profile/${user.id}`}
																key={user.id}
															>
																<div className='flex gap-1 w-full rounded-md cursor-pointer opacity-70 hover:opacity-100  p-1 justify-between mt-2 items-center '>
																	{user.avatar ? (
																		<Avatar className='h-8 w-8 border border-border'>
																			<AvatarImage
																				src={user.avatar}
																			></AvatarImage>
																		</Avatar>
																	) : (
																		<Avatar className='h-8 w-8 border border-border'>
																			<AvatarFallback>
																				{user.name
																					? user.name.charAt(0).toUpperCase()
																					: user.email.charAt(0).toUpperCase()}
																			</AvatarFallback>
																		</Avatar>
																	)}
																	{user.name ? (
																		<p className='font-semibold text-neutral-700 text-sm mb-2'>
																			{user.name}
																		</p>
																	) : (
																		<p className='font-semibold text-sm text-neutral-700 mb-2'>
																			{user.email}
																		</p>
																	)}
																</div>
															</Link>
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
		</div>
	)
}

export default BoardRoles
