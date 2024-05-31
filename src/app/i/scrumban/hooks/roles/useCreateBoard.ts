import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { TypeBoardFormState } from '@/types/board.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { boardService } from '@/services/board.service'

export function useCreateBoard() {
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { mutate: createBoard, isPending } = useMutation({
		mutationKey: ['create board'],
		mutationFn: (data: TypeBoardFormState) => boardService.createBoard(data),
		onSuccess: data => {
			toast.success(`Board "${data.data.board.name}" created`)
			push(`${DASHBOARD_PAGES.SCRUMBAN}/board/${data.data.board.id}`)

			queryClient.invalidateQueries({ queryKey: ['boards'] })
		},
		onError(error: unknown) {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message || 'An error occurred'
				toast.error(message)
			} else {
				toast.error('An error occurred')
			}
		}
	})

	return { createBoard }
}
