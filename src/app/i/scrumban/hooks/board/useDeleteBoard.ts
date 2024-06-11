import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { boardService } from '@/services/board.service'

export function useDeleteBoard() {
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { mutate: deleteBoard, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete board'],
		mutationFn: (id: string) => boardService.deleteBoard(id),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['board'] }),
					toast.success(data.message)
				push(DASHBOARD_PAGES.SCRUMBAN)
			} else {
				toast.error(data.message)
			}
		}
	})

	return { deleteBoard, isDeletePending }
}
