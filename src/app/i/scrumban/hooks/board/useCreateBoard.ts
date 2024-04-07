import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeBoardFormState } from '@/types/board.types'

import { boardService } from '@/services/board.service'

export function useCreateBoard() {
	const queryClient = useQueryClient()

	const { mutate: createBoard } = useMutation({
		mutationKey: ['create board'],
		mutationFn: (data: TypeBoardFormState) => boardService.createBoard(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['boards']
			})
		}
	})

	return { createBoard }
}
