import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeBoardFormState } from '@/types/board.types'

import { boardService } from '@/services/board.service'
import { toast } from 'sonner'

export function useUpdateBoard(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateBoard } = useMutation({
		mutationKey: ['update board', key],
		mutationFn: ({ id, data }: { id: string; data: TypeBoardFormState }) =>
			boardService.updateBoard(id, data),
		onSuccess() {
			// queryClient.invalidateQueries({
			// 	queryKey: ['board']
			// }),
			toast.success(`name updated`)

		}
	})

	return { updateBoard }
}
