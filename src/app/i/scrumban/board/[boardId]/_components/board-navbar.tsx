import { IBoardResponse } from '@/types/board.types'

import { BoardTitleForm } from './board-title-form'

interface IBoardNavbarProps {
	board: IBoardResponse | undefined
}

export const BoardNavbar = ({ board }: IBoardNavbarProps) => {
	return (
		<div className='w-full h-14 z-[40] bg-black/50 fixed top-5 flex items-center px-6 gap-x-4 text-white'>
			<BoardTitleForm board={board} />
			<div className='ml-auto'></div>
		</div>
	)
}
