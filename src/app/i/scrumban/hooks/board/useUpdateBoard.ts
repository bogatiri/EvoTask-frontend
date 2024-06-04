import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeBoardFormState } from '@/types/board.types'

import { boardService } from '@/services/board.service'

export function useUpdateBoard(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateBoard } = useMutation({
		mutationKey: ['update board', key],
		mutationFn: ({ id, data }: { id: string; data: TypeBoardFormState }) =>
			boardService.updateBoard(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['board', key]
			})
		}
	})

	return { updateBoard }
}
