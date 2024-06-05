import { CornerDownLeft, Plus, Shell } from 'lucide-react'

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger
} from '@/components/ui/menubar'

import { IUser } from '@/types/auth.types'
import { IBoardResponse } from '@/types/board.types'

import { useCreateSprint } from '../../../hooks/sprint/useCreateSprint'

import SprintNavbar from './sprint-navbar'
import { useEffect, useState } from 'react'

interface ISprintMenuProps {
	board: IBoardResponse
	users: IUser[]
	onSprintPick: (sprintId: string) => void
	backToMainBoard: () => void
}

const SprintMenu = ({
	board,
	users,
	onSprintPick,
	backToMainBoard
}: ISprintMenuProps) => {

	const [items, setItems] = useState(board?.sprints)

	useEffect(() => {
		setItems(board.sprints)
	}, [board])

	const currentUser = localStorage.getItem('userId')

	const isScrum = users.find(user => user.id.toString() === currentUser!)?.roles.find(role => role.boardId === board.id)?.name === 'scrum_master'

	const { createSprint } = useCreateSprint()

	const handleCreateSprint = () => {
		const boardId = board!.id
		createSprint({ boardId })
	}

	return (
		<div>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>
						<div className='flex justify-center items-center h-10 pl-3'>
							<Shell className='h-4 w-4' />
							<span className='text-sm mx-3 my-1.5'>Sprints</span>
						</div>
					</MenubarTrigger>
					<MenubarContent>
						<MenubarItem
						
							className='cursor-pointer'
							onClick={handleCreateSprint}
						>
							<span className='ml-1'>Create a new sprint</span> <Plus />
						</MenubarItem>
						<MenubarSeparator />
						{items?.map((item, index) => (
							<div key={index}>
								<div onClick={() => onSprintPick(item.id)}>
									<SprintNavbar
									users={board.users}
										isScrum={isScrum}
										backToMainBoard={backToMainBoard}
										item={item}
										index={index}
									/>
								</div>
								<MenubarSeparator />
							</div>
						))}
						<MenubarItem
							className='cursor-pointer'
							onClick={() => backToMainBoard()}
						>
							<span>Back to main board</span>
							<CornerDownLeft
								className='mr-1'
								size={16}
							/>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	)
}

export default SprintMenu
