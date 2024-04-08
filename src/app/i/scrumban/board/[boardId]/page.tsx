'use client'

import { useBoardId } from '../../hooks/board/useBoardId'
import { useListById } from '../../hooks/list/useLists'

import { BoardNavbar } from './_components/board-navbar'
import { ListContainer } from './_components/list-container'

export default function BoardIdPage() {
	const { board, isLoading: isBoardLoading } = useBoardId()

	const boardId = board?.id
	const isBoardLoaded = !isBoardLoading && boardId !== undefined

	const {
		list,
		isLoading: isListLoading,
		error
	} = useListById(boardId!, { enabled: isBoardLoaded })
	if (isBoardLoading || isListLoading) return <div>Loading...</div>

	if (!isBoardLoading && !isListLoading) {
		return (
			<div
				className=' flex flex-col relative size-full m-0 bg-no-repeat bg-cover bg-center'
				style={{ backgroundImage: `url(${board?.imageFullUrl})` }}
			>
				<div className='p-4 h-full text-lg text-card-foreground overflow-x-auto z-100'>
					<BoardNavbar board={board} />
					<ListContainer
						boardId={board!.id}
						list={list!}
					/>
				</div>
			</div>
		)
	}
}
