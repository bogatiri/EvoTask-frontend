'use client'

import { Loader, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { TransparentField } from '@/components/ui/fields/TransparentField'

import { IBoardResponse, TypeBoardFormState } from '@/types/board.types'

import { useBoardDebounce } from '../../../hooks/board/useBoardDebounce'
import { useDeleteBoard } from '../../../hooks/board/useDeleteBoard'

interface IBoardTitleForm {
	board: IBoardResponse | undefined
}

export const BoardTitleForm = ({ board }: IBoardTitleForm) => {
	const { register, control, watch } = useForm<TypeBoardFormState>({
		defaultValues: {
			name: board?.name,
			createdAt: board?.createdAt
		}
	})

	useBoardDebounce({ watch, boardId: board!.id })

	const { deleteBoard, isDeletePending } = useDeleteBoard()

	return (
		<div className='flex '>
			<div>
				<TransparentField
					className='text-lg text-foreground font-bold px-[7px] h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-foreground'
					{...register('name')}
				/>
			</div>
			<div>
				<Button
					onClick={() => deleteBoard(board!.id)}
					className='text-foreground opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</Button>
			</div>
		</div>
	)
}
