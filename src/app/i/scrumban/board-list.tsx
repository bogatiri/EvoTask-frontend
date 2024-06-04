'use client'

import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'

import { FormPopover } from '@/components/form/form-popover'
import { Hint } from '@/components/hint'

import { useBoards } from './hooks/board/useBoards'
import { useState } from 'react'

export const BoardList = () => {
	const { items, setItems } = useBoards()
	const [isPicked, setIsPicked] = useState(false)

	const pickImage = () => {
		setIsPicked(true)
	}


	return (
		<div className='space-y-4 m-big-layout'>
			<div className='flex items-center font-semibold text-lg text-neutral-700'>
				<User2 className='h-6 w-6 mr-2' />
				Your boards
			</div>
			<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-4 gap-4'>
				{items?.map(board => (
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
					sideOffset={10}
					side='right'
					isPicked={isPicked}
					pickImage={pickImage}
				>
					<div
						role='button'
						className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
						onClick={() => setIsPicked(false)}
					>
						<p className='text-sm'>Create new board</p>
						<Hint
							sideOffset={70}
							description={`
							What makes EvoTask different is that it gives you the ability to create an unlimited number of options for accessing boards, tasks, and other elements of your workspace.
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
