import { IBoardResponse } from '@/types/board.types'

import { BoardTitleForm } from './board-title-form'

interface IBoardNavbarProps {
	board: IBoardResponse
	onSprintPick: (sprintId: string) => void
	backToMainBoard: () => void
}

const BoardNavbar = ({
	board,
	onSprintPick,
	backToMainBoard
}: IBoardNavbarProps) => {
	return (
		<div className='w-[80vw] fixed h-14 z-[40] bg-black/50 flex items-center md:px-6 gap-x-4 '>
			<BoardTitleForm
				backToMainBoard={backToMainBoard}
				onSprintPick={onSprintPick}
				board={board}
			/>
		</div>
	)
}

export default BoardNavbar