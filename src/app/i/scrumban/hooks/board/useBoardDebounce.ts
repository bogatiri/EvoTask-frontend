import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeBoardFormState } from '@/types/board.types'

import { useCreateBoard } from './useCreateBoard'
import { useUpdateBoard } from './useUpdateBoard'

interface IUseBoardDebounce {
	watch: UseFormWatch<TypeBoardFormState>
	boardId: string
}

export function useBoardDebounce({ watch, boardId }: IUseBoardDebounce) {
	const { createBoard } = useCreateBoard()
	const { updateBoard } = useUpdateBoard()

	const debouncedCreateBoard = useCallback(
		debounce((formData: TypeBoardFormState) => {
			createBoard(formData)
		}, 444),
		[]
	)

	// Теперь debouncedUpdateBoard будет сохраняться между рендерами, и debounce будет работать как ожидается.
	const debouncedUpdateBoard = useCallback(
		debounce((formData: TypeBoardFormState) => {
			updateBoard({ id: boardId, data: formData })
		}, 444),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (boardId) {
				debouncedUpdateBoard({
					...formData,
				})
			} else {
				debouncedCreateBoard(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateBoard, debouncedCreateBoard])
}
