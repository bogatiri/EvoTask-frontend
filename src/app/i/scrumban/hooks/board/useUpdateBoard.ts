import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeBoardFormState } from '@/types/board.types'

import { boardService } from '@/services/board.service'

export function useUpdateBoard(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateBoard } = useMutation({
		mutationKey: ['update board', key],
		mutationFn: ({ id, data }: { id: string; data: TypeBoardFormState }) =>
			boardService.updateBoard(id, data),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['board'] }),
					toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		}
	})

	return { updateBoard }
}
