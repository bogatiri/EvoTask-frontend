'use client'

import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { FormPopover } from '@/components/form/form-popover'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'

import { IBoardResponse } from '@/types/board.types'

import { useBoards } from './hooks/board/useBoards'

export const BoardList = () => {
	const { items, setItems } = useBoards()
	const [boards, setBoards] = useState<IBoardResponse[]>(items!)

	useEffect(() => {
		if (items) {
			setItems(items)
			setBoards(items)
		}
	}, [items, boards])

	const onBoardCreate = (newBoard: IBoardResponse) => {
		const updatedBoards = [...boards!, newBoard]
		setItems(updatedBoards)
	}

	return (
		<div className='space-y-4 m-big-layout'>
			<div className='flex items-center font-semibold text-lg text-neutral-700'>
				<User2 className='h-6 w-6 mr-2' />
				Your boards
			</div>
			<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-4 gap-4'>
				{boards?.map(board => (
					<Link
						key={board.id}
						href={`/i/scrumban/board/${board.id}`}
						className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden'
						style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
					>
						<div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
						<p className='relative font-semibold text-white'>{board.name}</p>
					</Link>
				))}
				<FormPopover
					onBoardCreate={onBoardCreate}
					sideOffset={10}
					side='right'
				>
					<div
						role='button'
						className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
					>
						<p className='text-sm'>Create new board</p>

						<Hint
							sideOffset={40}
							description={`
                Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.
              `}
						>
							<HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	)
}

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className='grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
		</div>
	)
}
