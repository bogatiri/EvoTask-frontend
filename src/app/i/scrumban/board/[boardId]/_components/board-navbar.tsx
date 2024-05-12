import { IBoardResponse } from '@/types/board.types'

import { BoardTitleForm } from './board-title-form'

interface IBoardNavbarProps {
	board: IBoardResponse | undefined
	onSprintPick: (sprintId: string) => void
	backToMainBoard: () => void

}

export const BoardNavbar = ({ board, onSprintPick, backToMainBoard }: IBoardNavbarProps) => {
	return (
		<div className='w-full h-14 z-[40] bg-black/50 top-5 flex items-center px-6 gap-x-4 text-white'>
			<BoardTitleForm backToMainBoard={backToMainBoard} onSprintPick={onSprintPick} board={board} />
			<div className='ml-auto'></div>
		</div>
	)
}
