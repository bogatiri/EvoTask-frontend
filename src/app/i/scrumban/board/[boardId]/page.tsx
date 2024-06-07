'use client'

import { useEffect, useState } from 'react'

import { IListResponse } from '@/types/list.types'

import { useBoardId } from '../../hooks/board/useBoardId'
import { useListById } from '../../hooks/list/useLists'
import { useSprintById } from '../../hooks/sprint/useSprints'

import BoardNavbar from './_components/board-navbar'
import ListContainer from './_components/list-container'

export default function BoardIdPage() {
	const { board, isLoading: isBoardLoading } = useBoardId()

	const boardId = board?.id
	const isBoardLoaded = !isBoardLoading && boardId !== undefined
	const { list, isLoading: isListLoading } = useListById(boardId!, {
		enabled: isBoardLoaded
	})

	const [lists, setLists] = useState<IListResponse[] | undefined>([])

	useEffect(() => {
		setLists(list)
	}, [list])

	useEffect(() => {
		document.title = `EvoTask | ${board?.name}` || 'ScrumBan'
	}, [board])

	const [sprintId, setSprintId] = useState<string | null>(null)
	const { sprint, isLoading: isSprintLoading } = useSprintById(sprintId!, {
		enabled: isBoardLoaded && sprintId !== null
	})

	const onSprintPick = (pickedSprintId: string) => {
		setSprintId(pickedSprintId)
	}

	
	const backToMainBoard = () => {
		setSprintId(null)
		setLists(list)
	}

	


	if (isBoardLoading || isListLoading) return <div>Loading...</div>
	if (!isBoardLoading && !isListLoading) {
		if (lists) {
			
			const isSprintLoaded = sprint && !isSprintLoading
			const sprintLists =
				isSprintLoaded && sprint.list.length > 0 ? sprint.list : []
			const listsToShow =
				lists && sprintLists.length > 0 ? [lists[0], ...sprintLists] : lists
			return (
				<div
					className=' flex flex-col custom-scrollbar relative size-full bg-no-repeat bg-cover bg-center '
					style={{ backgroundImage: `url(${board?.imageFullUrl})` }}
				>
					<div className='md:px-4 board-container text-lg text-card-foreground h-full overflow-y-hidden overflow-x-auto custom-scrollbar'>
					<div className='sticky top-0 w-full'>
						<BoardNavbar
							onSprintPick={onSprintPick}
							backToMainBoard={backToMainBoard}
							board={board!}
							/>
							</div>
						<ListContainer list={lists.length > 0 ? listsToShow! : sprintLists} />
					</div>
				</div>
			)
		}
	}
}
