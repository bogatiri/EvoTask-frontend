'use client'

import { List, Settings } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import Description from '@/components/ui/items-options/description'
import SprintStatus from '@/components/ui/items-options/pick-status'
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
import PickStatus from '@/components/ui/items-options/pick-status'

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

	const creator = board!.users[0]
	const chatId = board!.chats[0].id

	const onMessageSend = (message: IMessageResponse[]) => {
		setMessages(message)
	}


	return (
		<>
			<div className='flex w-full justify-between items-center border-b border-border p-2 gap-2'>
				<div className='w-full flex flex-col gap-3'>
					<TransparentField
						className='text-lg w-[400px] font-bold px-[7px] h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-foreground'
						{...register('name')}
					/>
				</div>
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
				<div>
					<Dialog>
						<div className='flex items-center justify-center h-10'>
							<DialogTrigger>
								<div className='flex justify-center items-center h-10 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
									<Settings className='h-4 w-4' />
									<span className='text-sm mx-3 my-1.5'>Settings</span>
								</div>
							</DialogTrigger>
						</div>
						<DialogContent>
							<DialogHeader>
								<DialogTitle autoFocus={false}>
									<div className='flex gap-3'>
										<div className='flex items-center justify-center gap-3'>
											<List />
											<TransparentField
												autoFocus={false}
												{...register('name')}
											/>
										</div>
										<Creator creator={creator} />
									</div>
								</DialogTitle>
								<DialogDescription>
									You can change all of this attributes
								</DialogDescription>
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
