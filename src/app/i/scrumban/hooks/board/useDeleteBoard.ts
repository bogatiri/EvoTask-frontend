import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardService } from '@/services/board.service'
import { useRouter } from 'next/router'

export function useDeleteBoard() {
	const queryClient = useQueryClient()


	const { mutate: deleteBoard, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete board'],
		mutationFn: (id: string) => boardService.deleteBoard(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['boards']
			})
			const router = useRouter()
			router.push('/i/scrumban');
		}
	})

	return { deleteBoard, isDeletePending }
}
