'use client'

import { List, Settings } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { TransparentFieldTextarea } from '@/components/ui/fields/TransparentFieldTextarea'
import Description from '@/components/ui/items-options/description'
import PickStatus from '@/components/ui/items-options/pick-status'
import { Separator } from '@/components/ui/separator'

import { IBoardResponse, TypeBoardFormState } from '@/types/board.types'
import { IMessageResponse } from '@/types/message.types'
import { EnumSprintStatus } from '@/types/sprint.types'

import AddUser from '../../../../../../components/ui/items-options/addUser'
import Creator from '../../../../../../components/ui/items-options/creator'
import Delete from '../../../../../../components/ui/items-options/delete'
import Users from '../../../../../../components/ui/items-options/users'
import { useBoardDebounce } from '../../../hooks/board/useBoardDebounce'

import BoardChat from './board-chat'
import BoardRoles from './board-roles'
import SprintMenu from './sprint-menu'

interface IBoardTitleForm {
	board: IBoardResponse
	onSprintPick: (sprintId: string) => void
	backToMainBoard: () => void
}

export const BoardTitleForm = ({
	board,
	onSprintPick,
	backToMainBoard
}: IBoardTitleForm) => {
	const [messages, setMessages] = useState(board!.chats[0].messages)

	const { register, control, watch } = useForm<TypeBoardFormState>({
		defaultValues: {
			name: board?.name,
			createdAt: board?.createdAt,
			description: board?.description,
			status: board?.status
		}
	})

	useBoardDebounce({ watch, boardId: board!.id })

	const creator = board!.creator
	const chatId = board!.chats[0].id

	const onMessageSend = (message: IMessageResponse[]) => {
		setMessages(message)
	}

	return (
		<>
			<div className='grid grid-cols-[1.8fr_0.2fr] fixed w-[100vw] md:w-[85vw] items-center border-b border-border p-3 md:p-2 gap-2 '>
				<div className='flex gap-2 w-full items-center'>
					<BoardRoles
						roles={board.roles}
						users={board.users}
						creator={board.userId}
					/>
					<BoardChat
						messages={messages}
						chatId={chatId}
						onMessageSend={onMessageSend}
					/>
					<SprintMenu
						users={board.users}
						backToMainBoard={backToMainBoard}
						onSprintPick={onSprintPick}
						board={board}
					/>
					<TransparentField
						className=' w-full font-bold px-[7px] h-7 hidden lg:block border-foreground text-lg'
						{...register('name')}
					/>
				</div>
				<div className='flex self-end justify-end items-center'>
					<Dialog>
						<div className='flex self-end justify-end xl:justify-end items-center   h-10'>
							<DialogTrigger>
								<div className='flex justify-center self-end items-center h-10 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
									<Settings className='h-4 w-4' />
									<span className='hidden md:block text-sm mx-3 my-1.5'>
										Settings
									</span>
								</div>
							</DialogTrigger>
						</div>
						<DialogContent>
							<DialogHeader>
								<DialogTitle autoFocus={false}>
									<div className='flex gap-3 w-full'>
										<div className='flex items-center w-full mr-3 justify-center gap-3'>
											<List size={20} />
											<TransparentFieldTextarea
												className='text-xs h-auto'
												autoFocus={false}
												{...register('name')}
											/>
										</div>
									</div>
								</DialogTitle>
								<Creator
									style={{ justifyContent: 'start' }}
									creator={creator}
								/>
							</DialogHeader>
							<div className='flex flex-col-[0.5fr_1fr] justify-between gap-4'>
								<Description
									register={register}
									placeholder='You can write a description to your board'
								/>

								<div className='flex flex-col gap-3'>
									<Delete boardId={board.id} />
									<Users data={board} />
									<PickStatus
										status={board.status as EnumSprintStatus}
										control={control}
									/>
								</div>
							</div>
							<Separator />
							<AddUser boardId={board.id} />
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</>
	)
}
