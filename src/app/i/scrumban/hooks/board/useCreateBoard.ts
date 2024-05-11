import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { boardService } from '@/services/board.service'
import { isAxiosError } from 'axios'
import { IBoardResponse, TypeBoardFormState } from '@/types/board.types'

export function useCreateBoard() {
	const queryClient = useQueryClient()

		const { mutate: createBoard, isPending } = useMutation(
			{
				mutationKey: ['create board'],
				mutationFn: (data: TypeBoardFormState) => boardService.createBoard(data),
				onSuccess: data => {
					queryClient.invalidateQueries({
						queryKey: ['create board']
					})
					toast.success(`User "${data.data.name}" added`)
					queryClient.invalidateQueries({queryKey:['boards']})
				},
				onError(error: unknown) {
					if (isAxiosError(error)) {
						const message = error.response?.data?.message || 'An error occurred'
						toast.error(message)
					} else {
						toast.error('An error occurred')
					}
				}
			}
		)

	return { createBoard }
}
